import {processS3UrlView} from "../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";

export const triggerS3UrlViewProcessing=(
		elementId,
		s3ProcessingType,
		componentS3TimeStampStart,
		postType,
		postId,
		userId
	)=>{
	const currentTimeStamp=new Date().getTime();
	const s3UrlElement=document.getElementById(elementId);
	if(s3UrlElement!=null){
		let timeSpentWatching=(currentTimeStamp-componentS3TimeStampStart)/1000;
		const descriptionTotalTime=s3UrlElement.duration;
		if(timeSpentWatching>descriptionTotalTime){
			timeSpentWatching=descriptionTotalTime;
		}
		const s3UrlViewPostProcessor={
			postId,
			s3ViewCount:timeSpentWatching,
			userId,
			postType,
			performanceAdapterType:s3ProcessingType,
			totalWatchTime:descriptionTotalTime		
		}

		processS3UrlView(s3UrlViewPostProcessor)
	}
}