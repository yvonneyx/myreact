export default (state = { list: [], page: 1, total: 0 }, action) => {
	switch(action.type){
		case 'PRODUCT_LOADED':
			console.log(action);
			return {...state};
		default:
			return state;
	}
};
