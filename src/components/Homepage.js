import React from 'react';
import { Weather } from '../doodles';

export default function HomePage (props) {
	return (
		<div className="page">
			<div className="mainProject">
				<Weather />
			</div>
		</div>
	)
}