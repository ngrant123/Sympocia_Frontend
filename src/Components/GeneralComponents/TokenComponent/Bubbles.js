import React,{useState,useEffect,useRef} from "react";
import styled,{css} from "styled-components";



const Bubble=styled.div`
 	position:absolute;
 	border-radius:50%;
 	height:20px;
 	width:20px;
 	background-color:#A98DDE;
 	z-index:30;
 	transition:8s;
 	${({index,millisecondsCountDown})=>
 		`animation: ${"bubbleUp"+index} ${millisecondsCountDown+"ms"} infinite;`
 	}

	${({index})=>
		css`
		  	@keyframes ${"bubbleUp"+index} {
				0%{
					${({startLeftPoint})=>
						`left:${startLeftPoint}%;`
					}
					${({startTopPoint})=>
						`top:${startTopPoint}%;`
					}
				}
				20%{
					${({startLeftPoint})=>
						`left:${startLeftPoint+5}%;`
					}

					${({startTopPoint})=>
						`top:${startTopPoint-20}%;`
					}
				}
				50%{
					${({startLeftPoint})=>
						`left:${startLeftPoint-10}%;`
					}

					${({startTopPoint})=>
						`top:${startTopPoint-30}%;`
					}
				}
				70%{
					${({startLeftPoint})=>
						`left:${startLeftPoint+10}%;`
					}
					${({startTopPoint})=>
						`top:${startTopPoint-48}%;`
					}
				}
				100%{
					${({startLeftPoint})=>
						`left:${startLeftPoint-10}%;`
					}
					${({startTopPoint})=>
						`top:${startTopPoint-70}%;`
					}
				}
			}
		`
 	}


 `;

const Bubbles=()=>{
	const [bubbles,changeBubbles]=useState([]);

	useEffect(()=>{
		const currentBubbles=bubbles;
		const startingBubbleLeftPosition=20;
		const startingBubbleTopPosition=70;
		const millisecondsCountDown=2000;

		for(var i=0;i<4;i++){
			currentBubbles.push(
				<Bubble 
					startLeftPoint={startingBubbleLeftPosition+(i*15)} 
					startTopPoint={startingBubbleTopPosition-(i*10)}
					millisecondsCountDown={millisecondsCountDown+((i+1)*1000)}
					index={i}
				/>);
		}
		console.log(currentBubbles);
		changeBubbles([...currentBubbles]);
	},[]);
	
	return(
		<React.Fragment>
			{bubbles.map(data=>
				<>{data}</>
			)}
		</React.Fragment>
	)
}

export default Bubbles;