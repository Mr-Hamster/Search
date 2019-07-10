import React from 'react'
import {crudBuilder} from '../../services/http'
import {FormControl, Button, Table} from 'react-bootstrap'
import './style.css'

export default class Search extends React.Component{
    state = {
        search:'',
        data:[],
        staticData: [],
        error:''
    }

    async componentDidMount(){   
        const response = await crudBuilder('Mr-Hamster/server/data').get();
        this.setState({
            staticData:response.data
        })
    }

    searching = () =>{
        const{staticData, search} = this.state;
        let arr=[];
        let str = search.toLowerCase();
        if(!search){
            this.setState({
                data: [],
                error: ''
            })
            return
        }
        for(let item of staticData){
            for(let value in item){
                if(String(item[value]).toLowerCase().includes(str)){
                    arr.push(item);
                    break;
                }
            }
        }
        if(arr.length){
            this.setState({
                data:arr
            })
        }else{
            this.setState({
                data: [],
                error: 'No results!'
            })
        }       
    }
    render(){
        const{data,error} = this.state;
        return(
            <div className='wrapper'>
                <div className='search'>
                    <FormControl aria-describedby="basic-addon1" style={{width:'70%', minWidth:'290px'}} placeholder='Searching...' onChange={(event)=>this.setState({search: event.target.value})}/>    
                    <Button variant="primary" onClick={this.searching}>Search</Button>
                </div>
                    { data.length ? ( 
                            <Table striped bordered hover variant="dark" style={{width: "95%"}}>
                                <thead>
                                    <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.data.map((item, index) => (
                                        <tr key={index}>
                                            <th>{item.id}</th>
                                            <th>{item.name}</th>
                                            <th>{item.price}</th>
                                            <th>{item.quantity}</th>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </Table>
                        ) : <div className='error'>{error}</div>
                    }
            </div>
        );
    }
}
