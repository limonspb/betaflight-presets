const readline = require('readline');
const fs = require("fs");

class PresetsFile
{
    constructor(fullPath, presetsFileEncoding)
    {
        this.fullPath = fullPath;
        this.title = "";
        this.version = "";
        this.description = [];
        
        this._remainingHeaders = ["title", "version"];       
        
        const fileContent = fs.readFileSync(this.fullPath, presetsFileEncoding);
        const lines = fileContent.split('\n');
            
        for (let line of lines) {            
            line = line.trim();
            if (line.startsWith("#")) {
                this._processHeaderLine(line);
            } else {
                break;
            }            
        }
        
        delete this._remainingHeaders;        
    }
    
    _processHeaderLine(line)
    {
        line = line.slice(1).trim();        
        
        if (this._remainingHeaders.length > 0) {
            this[this._remainingHeaders[0]] = line;
            this._remainingHeaders = this._remainingHeaders.slice(1);
        } else {
            this.description.push(line);
        }
    }
}

module.exports = PresetsFile;