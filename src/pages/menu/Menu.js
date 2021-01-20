import React, { Component } from 'react'
import { connect } from 'react-redux'
import Sidebar from '../../includes/Sidebar'
import TopBar from '../../includes/TopBar';
import Footer from '../../includes/Footer'
import Nestable from 'react-nestable';
import { MdAddCircleOutline, MdLoop, MdDelete, MdCreate } from "react-icons/md";
import {fetchPages,fetchBlogs,fetchAllBlogCategory} from '../../actions'
import Loader from 'react-loader-spinner'
import { v4 as uuidv4 } from 'uuid';
import API from '../../api/API';
import { store } from 'react-notifications-component';
import {Helmet} from "react-helmet";
import HyperModal from 'react-hyper-modal';
import $ from "jquery";


export class Menu extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
        //   itemsTemp: [{ id: 0, text: 'Andy' }, { id: 1, text: 'Harry', children: [{ id: 2, text: 'David',children: [{ id: 7, text: 'David7' }] }] }, { id: 3, text: 'Lisa' }, { id: 4, text: 'Mona' }, { id: 5, text: 'Ron' }, { id: 6, text: 'Joe' } ],
        itemsTemp: [],
        };
        this.addnew = this.addnew.bind(this);
        this.addCustomPage = this.addCustomPage.bind(this);
        this.handleOnChangeSort = this.handleOnChangeSort.bind(this);
      }


      componentDidMount(){
        this.props.fetchPages();
        this.props.fetchBlogs(); 
        this.props.fetchAllBlogCategory();


        API.get('/menu/5ff7218cb35f4f4170697f28')
          .then(response=>{
              this.setState({
                itemsTemp:   response.data.data.menu
              })
        })

        const script = document.createElement("script");
        script.src = "/assets/js/dynamitable.jquery.min.js";
        script.async = true;
        document.body.appendChild(script);
        
      }


    
      //* ADD DATA TO MENU */
      addnew = (name,url,type) => {
        var str = this.state.itemsTemp;
        var obj = str;
        obj.push({ id: uuidv4(), text: name, url:url, type:type });
        var str1 = obj;
        this.setState({
            itemsTemp:str1
        })
      }


      
      //* ADD CUSTOM PAGE */
      addCustomPage(e){
        e.preventDefault()
        const {pagename,pageurl}=e.target.elements;

        var str = this.state.itemsTemp;
        var obj = str;
        obj.push({ id: uuidv4(), text: pagename.value, url:pageurl.value, type:'custom' });
        var str1 = obj;
        this.setState({
            itemsTemp:str1
        })
      }


      

      handleOnChangeSort(items) {
          
        this.setState({
          itemsTemp: items
        });

        // var data={
        //     items:items
        // }
        // API.put(`/menu/5ff7218cb35f4f4170697f28`,data)
        // .then(response=>{
        //     console.log(response.data)
        // })
      }


      //* UPDATE ITEM */
      handleUpdate = (e) => {
          var items= this.state.itemsTemp;
            var data={
                items:items
            }
          API.put(`/menu/5ff7218cb35f4f4170697f28`,data)
            .then(response=>{
                console.log(response.data)
                response.data.response===true
                ?
                store.addNotification({
                    title: 'Success',
                    message: 'Update successfull',
                    type: 'success',                  
                    container: 'top-right', 
                    animationIn: ["animated", "fadeIn"],  
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                    duration: 3000
                    }
                })
                :
                alert('Failed')
            })
      }

      changePageName = (id,pagename) => {
        var itemToUpdate = id;
        var pageName = pagename;
        var items= this.state.itemsTemp;
        items.forEach(item => {
            var childrens = item.children;
            if(childrens){
                childrens.forEach(child1 => {
                    var child1Childrens = child1.children;
                    if(child1Childrens){
                        child1Childrens.forEach(child2=>{
                            if(child2.id === itemToUpdate){
                                child2.text = pageName
                            }
                        })
                    }
                    if(child1.id === itemToUpdate){
                        child1.text = pageName
                    }
                })
            }
            if(item.id === itemToUpdate){
                item.text = pageName
            }
        })

         this.setState({
            itemsTemp:items
        })

        // alert('Called');
        // console.log(id);
        // console.log(pagename);


      }


      updatePageName = e => {
          e.preventDefault();
          const {id, pagename } = e.target.elements;

          console.log(id.value);
          document.getElementById(`closemodal${id.value}`).click();

         this.changePageName(id.value,pagename.value);


      }

      


     
      //*RENDER ITEM */
      renderItem = ({ item }) => {
       
        return (
          <div key={item.id}>
            <div>
                {item.text} 
                {/* <span onClick={()=>this.changePageName(item.id,'My Page')}>
                    <MdCreate />
                </span> */}
                
                <span data-toggle="modal" className="cursor-pointer text-info ml-2" data-target={`#exampleModalCenter${item.id}`}>
                    <MdCreate />
                </span>

                <div className="modal fade" id={`exampleModalCenter${item.id}`} tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <button type="button" id={`closemodal${item.id}`} className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                            <h4>Edit Page</h4>
                            <form id="form-id" className="mt-4" onSubmit={this.updatePageName}>
                                <div className="form-group">
                                    <input type="text" id="id" defaultValue={item.id} hidden/>
                                    <label>Page Name</label>
                                    <input type="text" id="pagename" defaultValue={item.text} className="form-control"/>
                                </div>
                                <button className="btn btn-primary">Update</button>
                            </form>
                            {/* {item.id} */}
                        </div>
                    </div>
                    </div>
                </div>

                
                <span onClick={()=>this.handleDelete(item.id)} className="float-right text-danger cursor-pointer">
                    <MdDelete />
                </span> 
            </div>
          </div>
        );
      };

      
      //*DELETE ITEM */
      handleDelete(e){        
        var itemToDel = e;
        var items= this.state.itemsTemp;

        var filtered = items.filter(function(item) {             
             var childrens=item.children;            
             if(childrens)
             {
                 
                //  console.log(childrens)
                var filtered2 = childrens.filter(function(item2){
                var childrens2=item2.children;
                   if(childrens2)
                   {

                    //    console.log(childrens2)
                       var filteredchildren2 = childrens2.filter(children2=>children2.id!==itemToDel);
                       item2.children=filteredchildren2;

                   }
                })
                // return item2.id !== itemToDel;
                var filteredchildren = childrens.filter(children=>children.id!==itemToDel);
                item.children=filteredchildren;

                
             }
             return item.id !== itemToDel;
         });

    
         this.setState({
            itemsTemp:filtered
        })

      }



    render() {



        const items = this.state.itemsTemp 
        const renderItem = ({ item }) => item.text;

        const allpages = this.props.allpages.data;
        

        const allblogs = this.props.allblogs;

        const allblogcategories = this.props.allblogcategories;

        console.log(allblogcategories)

        return (
            <React.Fragment>
            <div id="wrapper">
            <Sidebar />
            <div className="content-page">
            <div className="content">             
            <TopBar pagename="Menu" />
            <div className="page-content-wrapper">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                            <h5 class="card-title">Pages</h5>
                                

                            <div id="accordion">
                                
                                <div className="card">
                                    <div className="card-header" id="headingOne">
                                    <h5 className="mb-0">
                                        <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        <span className="text-white">Pages</span>
                                        </button>
                                    </h5>
                                    </div>
                                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                    
                                    {!allpages
                                    ?
                                    <div className="card-body">
                                        <Loader type="TailSpin" color="#00BFFF" height={30} width={30} />
                                    </div>
                                    :
                                        <div className="card-body my_d1">
                                        

                                            <table className="js-dynamitable">
                                            <thead>
                                                <tr>
                                                    
                                                </tr>
                                                            
                                                <tr>
                                                <th><input className="js-filter form-control my_br0" type="text" placeholder="Search Page" /></th>
                                                
                                                </tr>
                                            </thead>
                                            
                                            <tbody>
                                                {allpages.map((page)=>{
                                                    return(
                                                        <tr key={page._id} className="my_d2 trp">
                                                            <td className="tdp">{page.name} <a onClick={()=>this.addnew(page.name,page.url,'page')} className="cursor-pointer"><MdAddCircleOutline /></a></td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                            </table>

                                        </div>
                                    }
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="card-header" id="headingFour">
                                    <h5 className="mb-0">
                                        <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                        <span className="text-white">Blog Categories</span>
                                        
                                        </button>
                                    </h5>
                                    </div>
                                    <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordion">
                                    
                                    {!allblogcategories
                                    ?
                                    <div className="card-body">
                                        <Loader type="TailSpin" color="#00BFFF" height={30} width={30} />
                                    </div>
                                    :
                                    <div className="card-body my_d1">


                                            <table className="js-dynamitable">
                                                <thead>
                                                    <tr>
                                                        
                                                    </tr>
                                                                
                                                    <tr>
                                                    <th><input className="js-filter form-control my_br0" type="text" placeholder="Search Blog Category" /></th>
                                                    
                                                    </tr>
                                                </thead>
                                                
                                                <tbody>
                                                    {allblogcategories.map((blogcat)=>{
                                                        return(
                                                            <tr key={blogcat._id} className="my_d2 trp">
                                                                <td className="tdp">{blogcat.name} <a onClick={()=>this.addnew(blogcat.name,blogcat.url,'blogcategory')} className="cursor-pointer"><MdAddCircleOutline /></a></td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>


                                    </div>
                                    }
                                    </div>
                                </div>


                                <div className="card">
                                    <div className="card-header" id="headingTwo">
                                    <h5 className="mb-0">
                                        <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        <span className="text-white">Blog Posts</span>
                                        
                                        </button>
                                    </h5>
                                    </div>
                                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">

                                    {!allblogs
                                    ?
                                    <div className="card-body">
                                        <Loader type="TailSpin" color="#00BFFF" height={30} width={30} />
                                    </div>
                                    :
                                    <div className="card-body my_d1">


                                            <table className="js-dynamitable">
                                                <thead>
                                                    <tr>
                                                        
                                                    </tr>
                                                                
                                                    <tr>
                                                    <th><input className="js-filter form-control my_br0" type="text" placeholder="Search Page" /></th>
                                                    
                                                    </tr>
                                                </thead>
                                                
                                                <tbody>
                                                    {allblogs.map((blog)=>{
                                                        return(
                                                            <tr key={blog._id} className="my_d2 trp">
                                                                <td className="tdp">{blog.title} <a onClick={()=>this.addnew(blog.title,blog.totalurl,'blogpost')} className="cursor-pointer"><MdAddCircleOutline /></a></td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>

                                    </div>
                                    }
                                    </div>
                                </div>
                                
                                <div className="card">
                                    <div className="card-header" id="headingThree">
                                    <h5 className="mb-0">
                                        <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        <span className="text-white">Custom Links</span>
                                            
                                        </button>
                                    </h5>
                                    </div>
                                    <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                                    <div className="card-body">
                                        <form action="" onSubmit={this.addCustomPage}>
                                            <input type="text" id="pagename" name="pagename" className="form-control" placeholder="Page Name" />
                                            <input type="text" id="pageurl" name="pageurl" className="form-control mt-2" placeholder="Page URL" />
                                            <button type="submit" className="cursor-pointer btn btn-primary btn-sm text-white btn-block mt-2">Add Page<MdAddCircleOutline /></button>
                                            {/* <button type="submit" className="btn btn-primary btn-sm mt-2 float-right">Add {uuidv4()}</button> */}
                                        </form>
                                    </div>
                                    </div>
                                </div>

                            </div>



                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-body">
                                <h5 class="card-title">Menu Structure <span className="float-right"><button className="btn btn-primary btn-sm" onClick={this.handleUpdate}><MdLoop /> Update Menu</button></span></h5>
                                <br/>
                                <Nestable
                                    maxDepth={3}
                                    items={items}
                                    renderItem={this.renderItem}
                                    onChange={this.handleOnChangeSort}
                                    ref={el => this.refNestable = el}
                                    renderCollapseIcon={({ isCollapsed }) =>
                                        isCollapsed ? (
                                        <span className="iconCollapse">+</span>
                                        ) : (
                                        <span className="iconCollapse">-</span>
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                    
                    </div>
                    
                </div>
            </div>
            </div>
            </div>
            <Footer />
            </div>
            </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    allpages:state.pages,
    allblogs:state.blogs,
    allblogcategories:state.blogcategories,


})


export default connect(mapStateToProps, {fetchPages,fetchBlogs,fetchAllBlogCategory})(Menu)
