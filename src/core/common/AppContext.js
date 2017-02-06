// contains various global settings to be used throughout in the app

const nodeEnv = process.env.NODE_ENV || 'development';
class AppContext {
    constructor() {
        this.app = {
            name: 'Automacro'
        };
        
        this.ui = {
            theme: 'light',
            primaryColour: '#87FF00',
            secondaryColour: '#FF0087',
            teritaryColour: '#0087FF',
            textColour: '#000000'
        };
        
        this.env = {
            nodeEnv: nodeEnv,
            isDevMode: nodeEnv == 'development' || process.execPath.match(/[\\/]electron/).length > 0
        };
    }
}

let appContext = new AppContext();
export default appContext;
