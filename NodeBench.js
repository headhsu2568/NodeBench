function NodeBench(outfile) {
    if(outfile !== null && outfile !== '') this.outfile = outfile;
}
NodeBench.prototype.quiet = false;
NodeBench.prototype.baseline = 0;
NodeBench.prototype.current = 0;
NodeBench.prototype.peakMem = 0;
NodeBench.prototype.heapInit = 0;
NodeBench.prototype.timeInit = 0;
NodeBench.prototype.startTimestamp = 0;
NodeBench.prototype.startTime = null;
NodeBench.prototype.endTime = null;
NodeBench.prototype.tickTimes = [];
NodeBench.prototype.outfile = '';
NodeBench.prototype.setQuiet = function() {
    this.quiet = true;
}
NodeBench.prototype.setOutfile = function(outfile) {
    if(typeof outfile !== 'undefined' && outfile !== null && outfile !== '') this.outfile = outfile;
    else this.outfile = '';
}
NodeBench.prototype.setBaseline = function(baseline) {
    if(typeof baseline !== 'undefined' && baseline !== null) this.baseline = baseline - 1;
    else this.baseline = this.current - 1;
}
NodeBench.prototype.getTime = function() {
    if(typeof this.startTimestamp === 'undefined' || this.startTimestamp === null || this.startTimestamp === 0) {
        this.startTimestamp = new Date().getTime() / 1000;
        this.timeInit = process.uptime();
    }
    return this.startTimestamp + process.uptime() - this.timeInit;
}
NodeBench.prototype.getMem = function() {
    var p = process.memoryUsage();
    if(this.heapInit === 0) {
        this.heapInit = p.heapTotal;
        this.peakMem = p.heapUsed;
    }
    else if(p.heapTotal > this.heapInit && p.heapTotal > this.peakMem) this.peakMem = p.heapTotal;
    else if(p.heapUsed > this.peakMem) this.peakMem = p.heapUsed;
    return [p.heapUsed, this.peakMem];
}
NodeBench.prototype.start = function(desc) {
    if(typeof desc === 'undefined' || desc === null) desc = 'NodeBench starts';
    if(this.current != 0) {
        if(this.quiet === false) console.log('[Error] NodeBench is already started');
    }
    else {
        ++this.current;
        this.startTime = ['>[' + this.current + ']', this.getTime(), this.getMem(), desc];
        this.tickTimes.push(this.startTime);
    }
}
NodeBench.prototype.restart = function(desc) {
    this.tickTimes = [];
    this.baseline = 0;
    this.current = 0;
    this.start(desc);
}
NodeBench.prototype.tick = function(desc, baseline) {
    if(typeof desc === 'undefined' || desc === null) desc = '';
    if(this.current < 1) {
        if(this.quiet === false) console.log('[Error] NodeBench is not started yet');
    }
    else {
        ++this.current;
        this.tickTimes.push(['>[' + this.current + ']', this.getTime(), this.getMem(), desc]);
        if(baseline === true) this.baseline = this.current - 1
    }
}
NodeBench.prototype.end = function(desc) {
    if(typeof desc === 'undefined' || desc === null) desc = 'NodeBench ends';
    if(this.current < 1) {
        if(this.quiet === false) console.log('[Error] NodeBench is not started yet');
    }
    else {
        ++this.current;
        this.endTime = ['>[' + this.current + ']', this.getTime(), this.getMem(), desc];
        this.tickTimes.push(this.endTime);
    }
}
NodeBench.prototype.report = function(html, showFormat) {
    if(typeof html === 'undefined' || html === null) html = false;
    if(typeof showFormat === 'undefined' || showFormat === null) showFormat = true;
    var br = '';
    if(html === true) br = '<br/>';
    var out = null
    if(typeof this.outfile === 'undefined' || this.outfile === null || this.outfile === '') out = console.log;
    else {
        br = br + '\n';
        out = function(line) {
            require('fs').appendFileSync(this.outfile, line);
        }.bind(this);
    }
    var base = this.tickTimes[this.baseline][1];
    if(showFormat === true) {
        out('-------------------------------------------------------------------------------------' + br);
        out('>[Seq no.] Timestamp (Elapsed Time) - Memory Usage (Peak Memory Usage) - Description' + br);
        out('-------------------------------------------------------------------------------------' + br);
    }
    for(var i in this.tickTimes) {
        var offset = this.tickTimes[i][1] - base;
        offset = offset.toFixed(10);
        if(offset >= 0) {
            if(offset < 10000000000) {
                offset = '0000000000' + offset;
                offset = '+' + offset.slice(-21);
            }
            else offset = '+' + offset;
        }
        else if(offset < -10000000000) {
            offset = '0000000000' + offset.slice(1);
            offset = '-' + offset.slice(-21);
        }
        var timestamp = this.tickTimes[i][1].toFixed(10);
        if(timestamp < 10000000000) {
            timestamp = '0000000000' + timestamp;
            timestamp = timestamp.slice(-21);
        }
        out(this.tickTimes[i][0] + ' ' + timestamp + ' (' + offset + ' secs) - ' + this.tickTimes[i][2][0] + ' bytes (' + this.tickTimes[i][2][1] + ' bytes) - ' + this.tickTimes[i][3] + br);
    }
    var elapsedTime = this.endTime[1] - this.startTime[1];
    out(br);
    out('============================================' + br);
    out('> Elapsed Time: ' + elapsedTime + ' secs' + br);
    out('> Peak Memory Usage: ' + this.peakMem + ' bytes' + br);
    out('============================================' + br);
    out(br);
    this.reportExtend(br, out);
}
NodeBench.prototype.reportExtend = function(br, out) {}

module.exports = NodeBench;
