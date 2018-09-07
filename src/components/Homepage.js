import React, { Component } from 'react';
import { connect } from 'react-redux';
import DoodleDisplay from './DoodleDisplay';
import uuid from 'uuid';

class HomePage extends Component {
	constructor(props) {
		super(props);
	}

	render () {
		return (
			<div className="page">

				{/*Project routes are set in the configureStore.js file*/}
				<div className="mainProject">
					<img src={`${this.props.projects.mainProject}`} />
				</div>
				<div className="lowerhalf">
					<div className="doodles">
						{
							this.props.projects.doodles.length 
							? this.props.projects.doodles.map((doodle)=>{
								return <DoodleDisplay
											key={uuid()}
											doodle={doodle} />
							}) 
							: null

						}
					</div>
				</div>

			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		projects: state.projects
	}
}

export default connect(mapStateToProps)(HomePage); 