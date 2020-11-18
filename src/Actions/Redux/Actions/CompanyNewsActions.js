
const updateDate=(newsInformation)=>{
	const {newsDate,newsId}=newsInformation;

	return{
		type:'UPDATE_DATE',
		payload:{
			newsDate:newsDate,
			newsId:newsId
		}
	}
}


const updateNews=(newsInformation)=>{

	const {news,newsId}=newsInformation;

	return{
		type:'UPDATE_NEWS',
		payload:{
			news:news,
			newsId:newsId
		}
	}
}


const addNews=(news)=>{

	return{
		type:'ADD_NEWS',
		payload:news
	}
}

module.exports={
	updateDate,
	updateNews,
	addNews
}