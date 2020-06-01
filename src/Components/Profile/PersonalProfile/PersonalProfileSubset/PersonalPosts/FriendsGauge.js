import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import {connect} from "react-redux";
import FriendsGaugeEditModal from "../../PersonalProfileSet/FriendsGaugeEditPortal.js";

const LocksCSS={
  marginLeft:"45%",
  marginRight:"45%",
  listStyle:"none",
  display:"inline-block"
}

const AddRemoveLevelButtonCSS={
  listStyle:"none",
  display:"inline-block",
  borderColor:"#5298F8",
  borderStyle:"solid",
  borderWidth:"1px",
  color:"#5298F8",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  marginRight:"3%"
}
class FriendsGauge extends React.Component {

  constructor(props){
    console.log(props);
    super(props);

    
    var numberNodes;
    var progressBarCounter;
    var {friendsGauge,friendsGaugeNodes}=this.props.personalInformation.userProfile;
    numberNodes=friendsGaugeNodes+1;
    debugger;
    if(this.props.personalInformation.isOwnProfile==true){
      progressBarCounter=100;
    }else{
      var friendProgress=friendsGauge[this.props.personalId];
      if(friendProgress!=null){
        var totalGaugeTickValue=100/friendsGaugeNodes;
        progressBarCounter=(friendProgress*totalGaugeTickValue)+2;
      }else{
        progressBarCounter=0;
      }
    }

    this.state={
      currentPercentage:0,
      numberOfNodes:numberNodes,
      nodeElemets:[],
      progressBarCounter:progressBarCounter,
      currentNodeCounter:1,
      displayFriendsGaugeEditModal:false,
      friendsGaugeActionType:""
    }
  }

  componentDidMount(){
    console.log(this.props)
    debugger;
  
    var currentCounter=0;
      setTimeout(()=>{
        while(currentCounter<this.state.progressBarCounter){
          this.setState({
            currentPercentage:currentCounter
          })
          currentCounter++;
        }
      },1000);
  }

  constructNodeElements=()=>{
    const ProgressBarSteps=[];
      for(var i=0;i<this.state.numberOfNodes;i++){
        const StepElement= <Step  transition="scale"
                                  index={i}>
                              {({ accomplished,index }) => (
                                <React.Fragment>
                                   {this.constructProgessBarStep(accomplished,index)}
                                </React.Fragment>
                              )}
                            </Step>;
        ProgressBarSteps.push(StepElement);
      }
      return ProgressBarSteps;
  }

  handleLockIconChange=(currentNode)=>{
    const intervalValue=100/(this.state.numberOfNodes-1);
    const currentIntervalValue=currentNode*intervalValue;

    return this.state.progressBarCounter>=currentIntervalValue?
      <LockOpenIcon
        style={{fontSize:30}}
      />:
      <LockIcon
           style={{fontSize:30}}
      />
  }

  constructProgessBarStep=(accomplished,index)=>{
      const currentNodeCounter=this.state.currentNodeCounter;
  
      return <ul style={{padding:"0px"}}>
                <li style={{listStyle:"none"}}>
                   {this.handleLockIconChange(index)}
                </li>

                                        <li style={{listStyle:"none"}}>
                                          <img
                                            style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                                            width="30"
                                            src="https://vignette.wikia.nocookie.net/pkmnshuffle/images/9/9d/Pichu.png/revision/latest?cb=20170407222851"
                                          />
                                        </li>
                                        <li style={{listStyle:"none"}}>
                                          <ul style={{padding:"0px"}}>
                                            <p style={{color:"white",backgroundColor:"#C8B0F4",padding:"7px",borderRadius:"5px"}}> Unlock </p>
                                            <p style={{color:"#5298F8"}}> <b>Level {index}</b></p>
                                            <p> Friends </p>

                                          </ul>

                </li>
              </ul>;

  }

  hideModal=()=>{
    this.setState({
      displayFriendsGaugeEditModal:false
    })
  }


  render() {

    return (
        <ul style={{padding:"0px"}}>
          <li style={{listStyle:"none",marginBottom:"7%"}}>
            <ul style={{padding:"0px"}}>
              <li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
                  <p style={{fontSize:"30px"}}><b>Friends Gauge</b></p>
              </li>
              {this.props.personalInformation.isOwnProfile==true?
                <React.Fragment>
                    <a href="javascript:void(0);" style={{textDecoration:"none"}}>
                  <li style={AddRemoveLevelButtonCSS} onClick={()=>this.setState({displayFriendsGaugeEditModal:true,friendsGaugeActionType:"Add"})}>
                      Add level
                  </li>
                </a>
                <a href="javascript:void(0);" style={{textDecoration:"none"}}>
                  <li style={AddRemoveLevelButtonCSS} onClick={()=>this.setState({displayFriendsGaugeEditModal:true,friendsGaugeActionType:"Remove"})}>
                      Remove level
                  </li>
                </a>

                <a href="javascript:void(0);" style={{textDecoration:"none"}}>
                  <li style={AddRemoveLevelButtonCSS} onClick={()=>this.setState({displayFriendsGaugeEditModal:true,friendsGaugeActionType:"Promote"})}>
                      Promote Someone
                  </li>
                </a>
                </React.Fragment>:
                <React.Fragment></React.Fragment>
              }

              {this.state.displayFriendsGaugeEditModal==true?
                  <FriendsGaugeEditModal
                      hideModal={this.hideModal}
                      actionType={this.state.friendsGaugeActionType}
                      userInformation={this.props.personalId}
                  />
                :<React.Fragment></React.Fragment>
              }
              

            </ul>
            <p> Random text to see how everything fits in place and stuff </p>
          </li>

          <li style={{listStyle:"none"}}>
              <ProgressBar
                percent={this.state.currentPercentage}
                filledBackground="linear-gradient(to right, #F6F4FA, #C8B0F4)"
              >
              {this.constructNodeElements()}
              </ProgressBar>
            </li>
        </ul>
      )
  }
}
const mapStateToProps=(state)=>{
  return{
    personalId:state.personalInformation.id
  }
}

export default connect(mapStateToProps,null)(FriendsGauge);