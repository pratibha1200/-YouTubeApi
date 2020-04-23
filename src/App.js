import React from 'react';

import { Grid } from '@material-ui/core';

import { SearchBar, VideoDetail } from './components';
import VideoList from './components/VideoList';

import youtube from './api/youtube';
class App extends React.Component {
    state = {
        videos: [],
        selectedVideo: null,
    }

    onVideoSelect = (video) => {
        this.setState({ selectedVideo: video });
    }

    handleSubmit = async (SearchTerm) => {
        const response = await youtube.get('search', {
            params:{
            part: 'snippet',
            maxResults: 5,
            key: 'AIzaSyBItRz6uqa04i1Qq04sYYfW2iHoag3_5bw',
            q: SearchTerm,
        }
    });

        this.setState({
            videos: response.data.items,
            selectedVideo: response.data.items[0]
        });
    }
    render (){
        const { selectedVideo, videos } = this.state;
        return(
            <Grid style={{width: '100%'}} justify="center" container spacing={12}>
                <Grid item xs={12}>
                    <Grid container xs={12} spacing={10}>
                        <Grid item xs={12}>
                            <SearchBar onFormSubmit={this.handleSubmit}/>
                        </Grid>
                        <Grid item xs={8}>
                            <VideoDetail video={selectedVideo}/>
                        </Grid>
                        <Grid item xs={4}>
                            <VideoList videos={videos} onVideoSelect={ this.onVideoSelect }/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default App;