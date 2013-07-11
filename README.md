NodeBench v0.1
==============

A simple benchmark tool for Node.js

Quick Start
-----------

    var NodeBench = require('NodeBench.js');
    var NB = new NodeBench(); // output to console
    var NB = new NodeBench('benchmark.log'); // output to file
    NB.start();
    NB.tick('the first tick'); // record this tick
    NB.tick('the second tick'); // record this tick
    NB.end();
    NB.report();


The output example:

    -------------------------------------------------------------------------------
    >[Seq no.] Timestamp (Elapsed Time) - Memory Usage (Peak Memory Usage) - Description
    -------------------------------------------------------------------------------
    >[1] 00000000.0298337810 (+00000000.0000000000 secs) - 2237504 bytes (2237504 bytes) - NodeBench starts
    >[2] 00000000.0299620300 (+00000000.0001282491 secs) - 2240888 bytes (2240888 bytes) - the first tick
    >[3] 00000000.0300181720 (+00000000.0001843910 secs) - 2242912 bytes (2242912 bytes) - the second tick
    >[4] 00000000.0300563390 (+00000000.0002225580 secs) - 2243288 bytes (2243288 bytes) - NodeBench ends

    ============================================
    > Elapsed Time: 0.00022255803924053907 secs
    > Peak Used Memory: 2243288 bytes
    ============================================

Remarks
-------

* For accurate evaluation of peak memory usage, starting the benchmark at the beginning of your program is recommended

<br />
- - -
###### by _Yen-Chun Hsu_ #######
- - -
