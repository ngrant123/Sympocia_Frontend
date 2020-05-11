import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';


const LocksCSS={
  marginLeft:"45%",
  marginRight:"45%",
  listStyle:"none",
  display:"inline-block"
}
class FriendsGauge extends React.Component {

  constructor(props){
    super(props);
    this.state={
      currentPercentage:0,
      numberOfNodes:3,
      nodeElemets:[],
      progreesBarCounter:80,
      currentNodeCounter:1 
    }
  }

  componentDidMount(){
    var currentCounter=0;
      setTimeout(()=>{
        while(currentCounter<this.state.progreesBarCounter){
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
        debugger;
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
    debugger;
    const intervalValue=100/(this.state.numberOfNodes-1);
    const currentIntervalValue=currentNode*intervalValue;

    return this.state.progreesBarCounter>=currentIntervalValue?
      <LockOpenIcon
        style={{fontSize:30}}
      />:
      <LockIcon
           style={{fontSize:30}}
      />
  }

  constructProgessBarStep=(accomplished,index)=>{
      console.log(index);
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


  render() {

    return (
        <ul style={{padding:"0px"}}>
          <li style={{listStyle:"none",marginBottom:"7%"}}>
            <p style={{fontSize:"30px"}}><b>Friends Gauge</b></p>
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

export default FriendsGauge;