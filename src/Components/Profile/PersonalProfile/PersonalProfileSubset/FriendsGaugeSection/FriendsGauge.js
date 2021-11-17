import React,{Component} from "react";
import styled from "styled-components";

import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import {connect} from "react-redux";
import FriendsGaugeEditModal from "../../PersonalProfileSet/Modals-Portals/FriendsGaugeEditPortal/index.js";
import RecruitsNodeInformationPortal from "../../PersonalProfileSet/Modals-Portals/NodeInformation/RecruitsNodeInformationPortal.js";
import StampIcon from "../../../../../designs/img/StampIcon.png";
import {
  MobileRecruitAndFriendsGaugeOptions,
  EditNodeModal
} from "../../PersonalProfileSet/MobileUI.js";

const Container=styled.div`
  margin-bottom:50px;

  @media screen and (min-width:2500px){
    #friendsGaugeTitle{
      font-size:48px !important;
    }
    #friendsGaugeOptions{
      font-size:24px !important;
    }
  }
  
  @media screen and (max-width:1370px){
    margin-bottom:0px;
    margin-left:5%;
  }
  @media screen and (max-width:650px){
    margin-left:10%;
    margin-right:5%;
  }

    @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
     margin-top:-10%;
     margin-bottom:5%;
    }
`;

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
  marginRight:"3%",
  cursor:"pointer"
}

const FriendsGaugeTitleCSS={
  listStyle:"none",
  display:"inline-block",
  marginRight:"5%",
  marginLeft:"-5%",
  fontSize:"30px"
}

/*
  Need to change friendsGaugeNodes
  Right now the current code is saying that friendsGaugeNode
  is a number. Its an array rn with object in it so it should be changed 
*/
class FriendsGauge extends Component {

  constructor(props){
    super(props);
    var numberNodes;
    var progressBarCounter;
    var {friendsGauge,friendsGaugeNodes}=this.props.personalInformation;
    numberNodes=friendsGaugeNodes.length+1;
    
    let refromattedNodes;
    if(this.props.personalInformation.isOwnProfile==true){
      progressBarCounter=100;
    }else{
      var friendProgress=friendsGauge[this.props.personalId];
      refromattedNodes=this.reformatNodeOrder(friendProgress,friendsGaugeNodes);
      if(friendProgress!=null){

        var totalGaugeTickValue=100/(friendsGaugeNodes.length-1);
        progressBarCounter=((friendProgress.length)*totalGaugeTickValue)+2;
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
      nodes:refromattedNodes==null?friendsGaugeNodes:refromattedNodes,
      displayNodeInformationModule:false,
      nodeInformation:{},
      displayPhoneEditNodesModal:false
    }
  }

  reformatNodeOrder=(userFollowedNodes,totalNodes)=>{
      let userFollowedNodesMap=new Map();
      if(userFollowedNodes!=null){
        for(var i=0;i<userFollowedNodes.length;i++){
          userFollowedNodesMap.set(userFollowedNodes[i],1);
        }

        for(var j=0;j<totalNodes.length;j++){
            const currentNodeId=totalNodes[j]._id;
            if(userFollowedNodesMap.has(currentNodeId)){
              const tempNode=totalNodes[j];
              totalNodes.splice(j,j);
              totalNodes.splice(1,0,tempNode);
            }
        }
      }
      return totalNodes;
  }

  componentDidMount(){
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
        let currentNode=this.state.nodes[i];
        currentNode={
          ...currentNode,
          nodeCounter:i
        }
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

  handleLockIconChange=(isUnlocked)=>{

    return isUnlocked==true?
      <LockOpenIcon
        style={{fontSize:30}}
      />:
      <LockIcon
           style={{fontSize:30}}
      />
  }
  /*
    Reason for the code below is because the way its set up for mobile is that 
    when user clicks the friends node progress bar it displays the options. But when
    you click the node itself both the node information and the options show up 
     but it overlaps cause the indexes are different. Callback solves this 
     but there probably is a better solution
  */

  displayNodeInformation=(node,isDesktop,isFirstNode)=>{  
      this.setState({
        displayNodeInformationModule:true,
        nodeInformation:{
          ...node,
          isFirstNode
        }
      },function(){
        this.setState({
          displayPhoneEditNodesModal:false
        })
      })
  }

  constructProgessBarStep=(accomplished,index,node)=>{
      const currentNodeCounter=this.state.currentNodeCounter;
      console.log(node);
      const {
        name,
        description,
        nodeCounter,
        totalPostsCount,
        nodeAvatar
      }=node;

      const intervalValue=100/(this.state.numberOfNodes-1);

      const currentIntervalValue=index*intervalValue;
      const isUnlocked=this.state.progressBarCounter>=currentIntervalValue;
      const isFirstNode=index==0?true:false;
      return <ul onClick={()=>this.displayNodeInformation(node,this.props.mobileUIStatus.displayDesktopUI,isFirstNode)} 
                style={{marginTop:"5%",padding:"0px"}}>
                {this.props.mobileUIStatus.displayDesktopUI==false?
                   <a href="javascript:void(0);" style={{textDecoration:"none"}}>
                      <li style={{listStyle:"none"}}>
                        <ul style={{padding:"0px"}}>
                          <p style={{color:"white",backgroundColor:"#C8B0F4",padding:"7px",borderRadius:"5px"}}>
                             <img
                                style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                                width="30"
                                src={nodeAvatar==null?StampIcon:nodeAvatar.imgUrl}
                                style={{borderRadius:"50%",height:"30px"}}
                              />
                          </p>
                        </ul>
                      </li>
                    </a>:
                  <a href="javascript:void(0);" style={{textDecoration:"none"}}>
                    <li style={{listStyle:"none"}}>
                       {this.handleLockIconChange(isUnlocked)}
                    </li>

                    <li style={{listStyle:"none"}}>
                      <img
                        style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                        width="50"
                        src={nodeAvatar==null?StampIcon:nodeAvatar.imgUrl}
                        style={{borderRadius:"50%",height:"50px"}}
                      />
                    </li>
                    <li style={{listStyle:"none"}}>
                      <ul style={{padding:"0px"}}>
                        <p style={{width:"40px",color:"white",backgroundColor:"#C8B0F4",padding:"7px",borderRadius:"5px"}}>
                           {totalPostsCount}
                        </p>
                        <p style={{color:"#5298F8",width:"100%",height:"15px",overflow:"hidden"}}>
                          <b>{name}</b>
                        </p>
                      </ul>
                    </li>
                  </a>
                }
              </ul>;

  }

  unlockedOrLockedPrompt=(index,isUnlocked)=>{
    
    if(index>0 && index<(this.state.numberOfNodes-2)){
      return <p style={{width:"60%",color:"white",backgroundColor:"#C8B0F4",padding:"7px",borderRadius:"5px"}}>
                 {isUnlocked==true?
                    <p>Unlock</p>:
                    <p>Locked</p>
                  } 
              </p>
    }else{
      return <p style={{width:"90%",color:"white",backgroundColor:"#C8B0F4",padding:"7px",borderRadius:"5px"}}>
         {isUnlocked==true?
            <p>Unlock</p>:
            <p>Locked</p>
          } 
      </p>
    }
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
    
      var currentNodes=this.state.nodes;

      currentNodes[nodeNumber]={
        ...currentNodes[nodeNumber],
        name:name,
        description:description
      }

      this.setState({
        nodes:currentNodes
      })
  }

  addNode=(data,isMaxAllowed)=>{
    debugger;
    if(this.state.nodes.length==3 && isMaxAllowed==false){
      alert('Maximum nodes is 3 :( Please delete one');
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
    
      var currentNodes=this.state.nodes;
      const {_id}=data;
      for(var i=0;i<currentNodes.length;i++){
          var selectedNode=currentNodes[i]._id;
          if(selectedNode==_id){
            currentNodes.splice(i,1);
            break;
          }
      }
      this.setState({
          displayFriendsGaugeEditModal:false,
          nodes:currentNodes
      });
  }

  implementAction=(action)=>{
    const {actionType,node,isMaxAllowed}=action;
    if(actionType=="Add"){  
        this.addNode(node,isMaxAllowed);
    }else{
        this.removeNode(node);
    }
  }
  closePhoneEditNodesModal=()=>{
      this.setState({
        displayPhoneEditNodesModal:false
      })
  }

  editFriendNodeActionTypeHandle=(actionType)=>{
      this.setState({
        displayFriendsGaugeEditModal:true,
        friendsGaugeActionType:actionType
      });
  }




  render() {

    return (
        <Container>
          <li style={{listStyle:"none",marginBottom:"7%"}}>
            <ul style={{padding:"0px"}}>
              {this.props.mobileUIStatus.displayPhoneUI==false &&(
                <p id="friendsGaugeTitle" style={FriendsGaugeTitleCSS}>
                  <b>Friends Gauge</b>
                </p>
              )}
              
              {this.props.mobileUIStatus.displayDesktopUI==true &&(
                  <>
                    {this.props.personalInformation.isOwnProfile==true &&(
                      <React.Fragment>
                          <li id="friendsGaugeOptions" style={AddRemoveLevelButtonCSS} onClick={()=>this.setState({
                                                                        displayFriendsGaugeEditModal:true,
                                                                        friendsGaugeActionType:"Add"})}>
                              Add level
                          </li>
                          <li id="friendsGaugeOptions" style={AddRemoveLevelButtonCSS} onClick={()=>this.setState({
                                                                          displayFriendsGaugeEditModal:true,
                                                                          friendsGaugeActionType:"Remove"})}>
                              Remove level
                          </li>
                          <li style={{listStyle:"none",display:"inline-block"}}>
                            <div class="dropdown">
                              <button class="btn btn-primary dropdown-toggle" 
                                type="button" data-toggle="dropdown" id="friendsGaugeOptions" 
                                style={AddRemoveLevelButtonCSS}>

                                Recruit Status

                                <span class="caret"></span>
                              </button>
                              <ul class="dropdown-menu" style={{padding:"10px"}}>
                                  <li id="friendsGaugeOptions" style={{cursor:"pointer"}} onClick={()=>this.setState({
                                                        displayFriendsGaugeEditModal:true,
                                                        friendsGaugeActionType:"Promote"})}>
                                      Promote Someone
                                  </li>
                                  <hr/>
                                  <li id="friendsGaugeOptions" style={{cursor:"pointer"}} onClick={()=>this.setState({
                                                    displayFriendsGaugeEditModal:true,
                                                    friendsGaugeActionType:"Demote"})}>
                                      Demote Someone
                                  </li>
                              </ul>
                            </div>
                          </li>
                      </React.Fragment>
                    )}
                  </>
              )}

              {this.state.displayFriendsGaugeEditModal==true?
                  <FriendsGaugeEditModal
                      hideModal={this.hideModal}
                      actionType={this.state.friendsGaugeActionType}
                      userInformation={this.props.personalId}
                      nodeNumber={this.state.numberOfNodes}
                      nodes={this.state.nodes}
                      createLevel={this.state.createLevel}
                      implementAction={this.implementAction}
                      isPhoneUITriggered={this.props.mobileUIStatus.displayPhoneUI}
                  />
                :<React.Fragment></React.Fragment>
              }

              {this.state.displayNodeInformationModule==true?
                  <RecruitsNodeInformationPortal
                      nodeInformation={this.state.nodeInformation}
                      closeModal={this.closeModal}
                      userId={this.props.personalInformation._id}
                      updateNode={this.updateNode}
                      isOwner={this.props.personalInformation.isOwnProfile}
                      isGuestVisitorProfile={this.props.personalInformation.isGuestVisitorProfile}
                      isPhoneUITriggered={this.props.mobileUIStatus.displayPhoneUI}
                      triggerFriendsGaugePostDisplay={this.props.retrieveFriendsGaugePosts}
                  />:<React.Fragment></React.Fragment>
              }
            </ul>
          </li>

          <li  onClick={()=>this.setState({displayPhoneEditNodesModal:true})} style={{listStyle:"none"}}>
            <a href="javascript:void(0);" style={{textDecoration:"none"}}>
                <ProgressBar
                  percent={this.state.currentPercentage}
                  filledBackground="linear-gradient(to right, #F6F4FA, #C8B0F4)"
                  height={20}
                >
                  {this.constructNodeElements()}
                </ProgressBar>
            </a>
          </li>

          {(this.state.displayPhoneEditNodesModal==true && this.props.personalInformation.isOwnProfile==true)==true &&(
            <EditNodeModal
              closeNodeOptions={this.closePhoneEditNodesModal}
              triggerActionTypeChange={this.editFriendNodeActionTypeHandle}
              editFriendNodeActionType={this.editFriendNodeActionTypeHandle}
            />
          )}
          {(this.props.mobileUIStatus.displayDesktopUI==false &&
            this.props.mobileUIStatus.displayPhoneUI==false)==true &&(
              <MobileRecruitAndFriendsGaugeOptions
                  editFriendNodeActionType={this.editFriendNodeActionTypeHandle}
                  isOwner={this.props.personalInformation.isOwnProfile}
              />
          )}
        </Container>
      )
  }
}
const mapStateToProps=(state)=>{
  return{
    personalId:state.personalInformation.id
  }
}

export default connect(mapStateToProps,null)(FriendsGauge);