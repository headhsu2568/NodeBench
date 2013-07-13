NodeBench
=========

#### v0.4.0

A simple benchmark tool for Node.js

Install
-------

    npm install nodebench

Quick Start
-----------

Example code:

    var NodeBench = require('nodebench'); // require this module
    var NodeBench = require('NodeBench.js'); // require main file directly
    var NB = new NodeBench(); // output to console
    var NB = new NodeBench('benchmark.log'); // output to file
    NB.start();
    NB.tick('the first tick'); // record this tick
    NB.tick('the second tick'); // record this tick
    NB.end();
    NB.report();

The output might be:

    -------------------------------------------------------------------------------------
    >[Seq no.] Timestamp (Elapsed Time) - Memory Usage (Peak Memory Usage) - Description
    -------------------------------------------------------------------------------------
    >[1] 1373695811.9530036449 (+0000000000.0000000000 secs) - 2240864 bytes (2240864 bytes) - NodeBench starts
    >[2] 1373695811.9531486034 (+0000000000.0001449585 secs) - 2245424 bytes (2245424 bytes) - the first tick
    >[3] 1373695811.9532113075 (+0000000000.0002076626 secs) - 2247712 bytes (2247712 bytes) - the second tick
    >[4] 1373695811.9532546997 (+0000000000.0002510548 secs) - 2248336 bytes (2248336 bytes) - NodeBench ends

    ============================================
    > Elapsed Time: 0.0002510547637939453 secs
    > Peak Memory Usage: 2248336 bytes
    ============================================

Remarks
-------

* For accurate evaluation of peak memory usage, starting the benchmark at the beginning of your program is recommended

<br />
- - -
###### by _Yen-Chun Hsu_ #######
- - -
