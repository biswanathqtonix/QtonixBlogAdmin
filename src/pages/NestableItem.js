import React, { Component } from 'react'
import Nestable from 'react-nestable';

export default class NestableItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemsTemp: [
        { id: 0, text: 'Andy' },
        {
          id: 1, text: 'Harry',
          children: [
            { id: 2, text: 'David' }
          ]
        },
        { id: 3, text: 'Lisa' },
        { id: 4, text: 'Mona' },
        { id: 5, text: 'Ron' },
        { id: 6, text: 'Joe' }
      ]
    };

    this.handleOnChangeSort = this.handleOnChangeSort.bind(this);
  }

  handleOnChangeSort(items) {
    this.setState({
      itemsTemp: items
    });

    console.log(items);
  }



    render() {
        const items = this.state.itemsTemp
          
        const renderItem = ({ item }) => item.text;
        return (
            <div>
                <br/><br/>

                <Nestable
                  maxDepth={2}
                  items={items}
                  renderItem={renderItem}
                  onChange={this.handleOnChangeSort}
                  renderCollapseIcon={({ isCollapsed }) =>
                    isCollapsed ? (
                      <span className="iconCollapse">+</span>
                    ) : (
                      <span className="iconCollapse">-</span>
                    )
                  }
                />
                <br/><br/><br/>
                <ul>
                  {this.state.itemsTemp.map((item1)=>{
                    return(
                        
                      item1.children !== undefined
                      ?
                      
                      
                      <li><b>{item1.text}</b>
                      
                        <ul key={item1.id}>
                          
                            {item1.children.map((items2)=>{
                              return(
                                <li key={items2.id}>{items2.text}</li>
                              )
                            })}
                            
                        </ul>
                            
                      </li>


                      :
                      <li key={item1.id}>{item1.text}</li>


                    )
                  })}
                  </ul>
                <br/>
                <br/><br/><br/>

                  

                <br/><br/>
            </div>
        )
    }
}
