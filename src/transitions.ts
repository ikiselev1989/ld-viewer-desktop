import { cubicOut } from 'svelte/easing';

type transitionOptions = {
	delay?: number,
	duration?: number,
	easing?: (t: number) => number,
	x?: number | string,
	y?: number | string,
	opacity?: number
}

export function fly(node: HTMLElement, {
	delay = 0,
	duration = 400,
	easing = cubicOut,
	x = 0,
	y = 0,
	opacity = 0,
}: transitionOptions = {}) {
	const style = getComputedStyle(node);
	const targetOpacity = +style.opacity;
	const transform = style.transform === 'none' ? '' : style.transform;

	const od = targetOpacity * (1 - opacity);

	let xValue = typeof x === 'number' ? `${x}px` : x;
	let yValue = typeof y === 'number' ? `${y}px` : y;

	return {
		delay,
		duration,
		easing,
		css: (t: number, u: number) => {
			return `
				transform: ${transform} translate(calc(${(1 - t)} * ${xValue}), calc(${(1 - t)} * ${yValue}));
				opacity: ${targetOpacity - (od * u)}`;
		},
	};
}

export function horizontalSlide(node, {
	delay = 0,
	duration = 400,
	easing = cubicOut,
	axis = 'x',
} = {}) {
	const style = getComputedStyle(node);
	const opacity = +style.opacity;
	const primary_property = axis === 'y' ? 'height' : 'width';
	const primary_property_value = parseFloat(style[primary_property]);
	const secondary_properties = axis === 'y' ? ['top', 'bottom'] : ['left', 'right'];
	const capitalized_secondary_properties = secondary_properties.map((e) => `${e[0].toUpperCase()}${e.slice(1)}`);
	const padding_start_value = parseFloat(style[`padding${capitalized_secondary_properties[0]}`]);
	const padding_end_value = parseFloat(style[`padding${capitalized_secondary_properties[1]}`]);
	const margin_start_value = parseFloat(style[`margin${capitalized_secondary_properties[0]}`]);
	const margin_end_value = parseFloat(style[`margin${capitalized_secondary_properties[1]}`]);
	const border_width_start_value = parseFloat(style[`border${capitalized_secondary_properties[0]}Width`]);
	const border_width_end_value = parseFloat(style[`border${capitalized_secondary_properties[1]}Width`]);
	return {
		delay,
		duration,
		easing,
		css: t =>
			'overflow: hidden;' +
			`opacity: ${Math.min(t * 20, 1) * opacity};` +
			`${primary_property}: ${t * primary_property_value}px;` +
			`padding-${secondary_properties[0]}: ${t * padding_start_value}px;` +
			`padding-${secondary_properties[1]}: ${t * padding_end_value}px;` +
			`margin-${secondary_properties[0]}: ${t * margin_start_value}px;` +
			`margin-${secondary_properties[1]}: ${t * margin_end_value}px;` +
			`border-${secondary_properties[0]}-width: ${t * border_width_start_value}px;` +
			`border-${secondary_properties[1]}-width: ${t * border_width_end_value}px;`,
	};
}
