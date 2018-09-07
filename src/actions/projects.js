//Set Application Data
export const setProjectData = ({projects} = {}) => {
	return {
		type: "SET_PROJECT_DATA",
		projects
	}
}