"use-strict";
import "../css/source_stats.css";
import '../css/pie.css';
import PieChart from './piechart.jsx';

class Stats extends React.Component {
    //import state property from React Component class, 
    //set state as empty
    constructor(props) {
        super(props);
        this.state = {data: []};
        // this.handleSubmit = this.handleSubmit.bind(this)
        // this.handleToneSelection = this.handleToneSelection.bind(this)
    }
    //this executes when the page is loaded
    componentDidMount() {
        this.getStats();
    }   
    getStats() {
        // let fetchUrl = '/all.json?filter=' + this.props.filterVal;
        // console.log('getStats()')
        //.then() handles the response from the ajax call
        fetch(this.props.fetch_url)
        //tells it to handle response like a json object
        .then(response => response.json())
        //
        .then(data => {
            // console.log(data);
            this.setState({
                data: data
            })
        });
    }

    render() {
        const stats = this.state.data;
        // console.log('stats', stats);
        const filter_ = this.props.filter_by
        // console.log('filter_', filter_);
        const statsList = Object.keys(stats).map(key => {
            if (stats[key]['filter'] == filter_ && filter_ != 'None' && filter_ != 'total') {
                const dict = stats[key]['data'];
                // console.log('dict', dict);
                console.log('rendering piechart');
                // console.log('dict', dict);
                return (
                    <PieChart key={key}
                            data={dict} 
                            heading={this.props.heading}
                            post_url={this.props.post_url}
                    />
                )
            }
            if (filter_ == 'total' && stats[key]['filter'] == 'total') {
                // console.log('rendering total');
                const total = stats[key]['data']['total'];
                // console.log('total', total)
                return (
                    <div key='total' id='stats-total' style={{color:'grey'}}>
                        <p> Total number of articles for source: {stats[key]['data']['total']} </p>
                    </div>
                )
            }
            if (filter_ == 'None' && stats[key]['filter'] == 'None' && stats[key]['data']['None'] > 0) {
                // console.log('rendering none');
                return (
                    <div key='None' style={{color:'grey'}}>
                        <p> *{stats[key]['data']['None'].length} article(s) were excluded because they had no dominant tones</p>
                    </div>
                )
            }
     
            if (filter_ == 'source_name' && key == 0) {
                // console.log('rendering source');
                return (
                    <div key='source'>
                        <h1> <b>{stats[key]['source']}</b> </h1>
                    </div>
                )
            }
        });
        return (
            <div className="stats">
                <div> {statsList} </div>
            </div>
        )
    };
}

export default Stats;
