import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api';

function LanguagesNav({selected, onUpdateLanguage}){
    const languages= ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python']
    return(
        <ul className='flex-center'>
            {languages.map((language) => (
                <li key={language}>
                <button className='btn-clear nav-link'
                style={language===selected? {color: 'rgb(187,46,31'}: null}
                onClick={()=> onUpdateLanguage(language)}>
                    {language}
                </button>
                </li>
            ))}
        </ul>
    )
}

LanguagesNav.propTypes ={
    selected: PropTypes.string.isRequired,
    onUpdateLanguage: PropTypes.func.isRequired
}
export default class Popular extends React.Component{

    constructor(props){
        super(props)

        this.state={
            selectedLanguage: 'All',
            repos: { },
            error: null
        }

        this.UpdateLanguage=this.UpdateLanguage.bind(this)
        this.isLoading=this.isLoading.bind(this)
    }

    componentDidMount(){
        this.UpdateLanguage(this.state.selectedLanguage)
    }
    UpdateLanguage(selectedLanguage){
        this.setState({
            selectedLanguage: selectedLanguage,
            error: null,
        })
        // console.log(selectedLanguage)
    
    if(!this.state.repos[selectedLanguage]){
        fetchPopularRepos(selectedLanguage)
            .then((data) => {
                this.setState(({repos}) => ({
                    repos: {
                        ...repos,
                        [selectedLanguage]: data
                    }
                }))
            })
            .catch(() => {
                console.warn('Error fetching repos: ', error)
        
                this.setState({
                    error: `There was an error fetching the repositories`
                })
            })  
        }
    }

    isLoading(){
        
        const { selectedLanguage, repos, error } = this.state
        
        return !repos[selectedLanguage] && error === null

    }

    render(){
        const {selectedLanguage, repos, error }=this.state

        return(
            <React.Fragment>
                <LanguagesNav
                selected={selectedLanguage}
                onUpdateLanguage={this.UpdateLanguage}
                />
            
            {this.isLoading() && <p>LOADING..</p>}

            {error && <p>{Error}</p>}

            {repos[selectedLanguage] && <pre>{JSON.stringify(repos[selectedLanguage], null, 2)}</pre>}
            </React.Fragment>

        )
    }
}
