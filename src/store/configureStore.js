import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

//Reducers
const defaultProjects = {
    mainProject: '/doodles/weather/assets/baseDrawing.svg',
    projects:[],
    doodles: ['/doodles/test.svg', '/doodles/test.svg']
};
const projects = (state=defaultProjects, action) => {
	switch(action.type) {
		case 'SET_PROJECT_DATA':
			return {
				...state
			}
			break;
		default:
			return state;
	}
}

//Create Store
export default () => {
	const store = createStore(
		combineReducers({
			projects
		})
	);

	return store;
}
