const initialState=[
	{

		date:"",
		news:"",
		newsId:0

	}
];


const NewsReducer=(state=initialState,action)=>{

	const {type,payload}=action;

	switch(type){

		case('UPDATE_DATE'):


			return (state.map(news=>{
				if(news.newsId==payload.newsId){

						return{
							...news,
							date:payload.newsDate
						}

					}
					else{
						return news;
					}
				})
			)

		break;

		case('UPDATE_NEWS'):

		return (state.map(news=>{

				if(news.newsId==payload.newsId){
					return{
						...news,
						news:payload.news
					}
				}else{
					return news;
				}
			})
			)
		break;


		case ('ADD_NEWS'):

			let news=state;
			const updateNews=news.push(payload);
			return updateNews;
		break;


		default:
			return state;
		break;
	}
}


export default NewsReducer;