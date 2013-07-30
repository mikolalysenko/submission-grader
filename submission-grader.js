var vm = require("vm");

//source is source module string, solution the is 
// the solution module string, inp is the input 
// string, delim is the input delim is the 
// delimeter for output. rubric.
//Returns [(#right/#wrong), [input #'s wrong]]
var submissionGrader = function(source, solution, inp, delim)
{
  try
  {
    if(typeof delim === "undefined")
    {
      var delim = "\n";
    }   
    
    var sourceOut = vm.runInNewContext(source, vm.createContext({input:inp}));
    var solOut = vm.runInContext(solution, vm.createContext({input:inp}));
    var sourceDat = sourceOut.split(delim);
    var solDat = solOut.split(delim);
    var wrongArr = new Array();

    //pairwise comparison of answers
    if(sourceDat.length < solDat.length)
    {
      return "Not enough output entries";
    }
    if(sourceDat.length > solDat.length)
    {
      return "Too many output entries";
    }
    var count = 0;
    for(var i = 0; i < sourceDat.length; i++)
    {
      if(sourceDat[i] == solDat[i])
        count = count + 1;
      else
        wrongArr.push(i);
    }
    return count / solDat.length;
  }
  catch(e)
  {
    return "Error:" + String(e);
  }
}

exports.submissionGrader = submissionGrader;
