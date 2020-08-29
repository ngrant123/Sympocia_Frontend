import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import {connect} from "react-redux";
import FriendsGaugeEditModal from "../../PersonalProfileSet/FriendsGaugeEditPortal/index.js";
import RecruitsNodeInformationPortal from "../../PersonalProfileSet/RecruitsNodeInformationPortal.js";

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

/*
  Need to change friendsGaugeNodes
  Right now the current code is saying that friendsGaugeNode
  is a number. Its an array rn with object in it so it should be changed 
*/
class FriendsGauge extends React.Component {

  constructor(props){
    console.log(props);
    super(props);

    
    var numberNodes;
    var progressBarCounter;
    var {friendsGauge,friendsGaugeNodes}=this.props.personalInformation.userProfile;
    console.log("Friend nodes");
    console.log(friendsGaugeNodes);
    numberNodes=friendsGaugeNodes.length+1;
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
      friendsGaugeActionType:"",
      nodes:friendsGaugeNodes,
      displayNodeInformationModule:false,
      nodeInformation:{}
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
      for(var i=0;i<this.state.nodes.length;i++){
        const currentNode=this.state.nodes[i];
        if(currentNode!=null){
             const StepElement= <Step  transition="scale"
                                        index={i}>
                                    {({ accomplished,index }) => (
                                      <React.Fragment>
                                         {this.constructProgessBarStep(accomplished,index,currentNode)}
                                      </React.Fragment>
                                    )}
                                  </Step>;
              ProgressBarSteps.push(StepElement);
        }
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

  displayNodeInformation=(node)=>{  
      this.setState({
          displayNodeInformationModule:true,
          nodeInformation:node
      })
  }

  constructProgessBarStep=(accomplished,index,node)=>{
      const currentNodeCounter=this.state.currentNodeCounter;
      const {name,description,nodeCounter}=node;
  
      return <ul onClick={()=>this.displayNodeInformation(node)} style={{padding:"0px"}}>
                <a href="javascript:void(0);" style={{textDecoration:"none"}}>
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
                      <p style={{color:"#5298F8"}}> <b>Level {nodeCounter}</b></p>
                      <p> {name} </p>

                    </ul>
                  </li>
                </a>
              </ul>;

  }

  hideModal=()=>{
    this.setState({
      displayFriendsGaugeEditModal:false
    })
  }

  createLevel=({name,description})=>{

  }

  closeModal=()=>{
    this.setState({
        displayNodeInformationModule:false
    })
  }
//
  updateNode=({name,description,nodeNumber})=>{
    debugger;
      var currentNodes=this.state.nodes;
      nodeNumber=nodeNumber!=0?nodeNumber-1:nodeNumber;

      currentNodes[nodeNumber]={
        ...currentNodes[nodeNumber],
        name:name,
        description:description
      }

      this.setState({
        nodes:currentNodes
      })
  }

  addNode=(data)=>{
    if(this.state.nodes.length==4){
      alert('Maximum nodes is 4 :( Please delete one');
    }else{
      var currentNodes=this.state.nodes;
      currentNodes.push(data);
      this.setState({
          displayFriendsGaugeEditModal:false,
          nodes:currentNodes
      })
    }
  }

  removeNode=(data)=>{
      console.log(data);
      var currentNodes=this.state.nodes;
      const {_id}=data;
      for(var i=0;i<currentNodes.length;i++){
          var selectedNode=currentNodes[i]._id;
          if(selectedNode==_id){
            currentNodes.splice(i,1);
            break;
          }
      }
      debugger;
      console.log(currentNodes);
      this.setState({
          displayFriendsGaugeEditModal:false,
          nodes:currentNodes
      });
  }

  implementAction=(action)=>{
    const {actionType,node}=action;
    if(actionType=="Add"){  
        this.addNode(node);
    }else{
        this.removeNode(node);
    }

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
                      nodeNumber={this.state.numberOfNodes}
                      nodes={this.state.nodes}
                      createLevel={this.state.createLevel}
                      implementAction={this.implementAction}
                  />
                :<React.Fragment></React.Fragment>
              }

              {this.state.displayNodeInformationModule==true?
                  <RecruitsNodeInformationPortal
                      nodeInformation={this.state.nodeInformation}
                      closeModal={this.closeModal}
                      userId={this.props.personalInformation.userProfile._id}
                      updateNode={this.updateNode}
                  />:<React.Fragment></React.Fragment>
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