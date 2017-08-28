import { EventEmitter } from "events"
import dispatcher from '../dispatcher'

class AggStore extends EventEmitter {
    
        constructor() {
    
            super();
    
            this.results = [];
            this.query = [];
    
        }
    
        getAll() {
            console.log(this.results);
            return this.results;
        }
        get_query(){
            return this.query;
        }
    
        UpdateStatus(results) {
            this.results = results.results;
            this.emit("change");
        }
        UpdateQuery(results) {
            this.query = results.results;
            this.emit("query");
        }
    
        handleActions(action) {
            switch (action.type) {
                case "RECEIVE_AGG": {
                    this.UpdateStatus(action);
                    break;
                }
                case "QUERY": {
                    this.UpdateQuery(action);
                    break;
                }
                // case "CORE_POST":{   
                //     var result_n = action.n;
                //     if (result_n === 1) {
                //        this.emit("core_updated");
                //     } else {
                //         this.emit("general_operation_result", action.err);
                //     }
                //     break;
                // }
      
                default: {
    
                }
            }
        }
    }
    
    
    const aggStore = new AggStore();
    dispatcher.register(aggStore.handleActions.bind(aggStore));
    window.dis = dispatcher; 
    export default aggStore;