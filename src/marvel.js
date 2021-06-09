import React from 'react'
import ReactDOM from 'react-dom'

class Marvel extends React.Component {
    constructor() {
        super();
        this.state = {
            searchText : '',
            response: []
        }
        this.handleSearchText = this.handleSearchText.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearchText(event) {
        this.setState({
            searchText: event.target.value
        })
    }
    handleSearch() {
        const url = "https://api.pokemontcg.io/v2/cards?q=name:" + this.state.searchText
        const headers = {
            'X-Api-Key' : 'e03c3a6b-a20a-49b0-a72b-fbedb6bd0ce1'
        }
        fetch(url, {
            method: 'GET',
            headers: headers
        }).then(res=>res.json()).then(response =>
            this.setState({
                result: response.data
            })
        )
    }
    render() {
        const response = this.state.result;
        return(
            <React.Fragment>
                <div>
                    <input type="text" name="searchMarvel" value={this.state.searchText} onChange={this.handleSearchText}/>
                    <button onClick={this.handleSearch}>Search</button>
                </div>
                {response && response.length>0 ?
                    <div style={{display:'flex',flexWrap:'wrap'}}>
                    {response.map(res => 
                        <div style={{background:'#bcb6be',width:'30%',padding:'10px',margin:'5px'}} key={res.id} className="card-holder">
                            {(res.name && res.name !== '') ?
                                <div>
                                    <h3>{res.name}</h3>
                                </div>
                            :null}
                            {(res.images.small && res.images.small !== '') ?
                                <div>
                                    <img src={res.images.small}/>
                                </div>
                            :(res.images.symbol && res.images.symbol !== '') ? 
                            <div>
                                <img src={res.images.small}/>
                            </div>
                            :null}
                        </div>
                    )}
                    </div>
                    : <div><h3>No results found!</h3></div>}
            </React.Fragment>
        )
    }
}
export default Marvel