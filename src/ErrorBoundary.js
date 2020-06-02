import React,{Component} from "react";
import styled from "styled-components";




class ErrorBoundary extends Component{

	constructor(props){
		super(props);
		this.state={
			hasError:false,
			error:null,
			errorInfor:null
		}
	}

	componentDidCatch(error,errorInfo){
		this.setState({
			hasError:true,
			error,
			errorInfo
		})
	}

	render(){
		return(
			<React.Fragment>
				{this.state.hasError==true?
					<p>An error has occured </p>:
					<React.Fragment>
						{this.props.children}
					</React.Fragment>
				}
			</React.Fragment>
		)
	}
}

export default ErrorBoundary;