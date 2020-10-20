PennController.ResetPrefix(null);                               //shorten command names (keep this line here)
PennController.DebugOff()

//// Set the order of the whole experiment ////
Sequence("intro", randomize("experiment"), "send", "bye");


//// Welcome page ////
PennController("intro",
    newCanvas("IntroText", 700, 600)
    .add("center at 50%",0, newText("startText", "<p><h2>歡迎您參加本次實驗</h2></p>"))
    .add("center at 50%",50, newText("startText", "<p><h2>您的參與將有助於人類對語言和認知的了解</h2></p>"))
    .add(150, 150, newText("instructionage", "年齡:"))
    .add(230, 150, newTextInput("age"))
    .add(150, 200, newText("instructiongender", "性別:"))
    .add(230, 200, newTextInput("gender"))
    .add(150, 250, newText("instructionjob", "職業/主修:"))
    .add(230, 250, newTextInput("job"))
    .add(150, 300, newText("instructionlang", "母語:"))
    .add(230, 300, newTextInput("lang"))
    .add(150, 350, newText("instructionotherlg", "其他語言:"))
    .add(230, 350, newTextInput("otherlg"))
    .add(150, 400, newText("instructionbirthplace", "出生地:"))
    .add(230, 400, newTextInput("birthplace"))
    .add("center at 50%", 500, newDropDown("consent", "您同意參與實驗請選「同意」")
                                            .add("我同意參與實驗","我不同意參與實驗")
                                            .test.selected("我同意參與實驗")
                                            .success())
    .css({"background-color": "floralwhite","border": "outset 1px black"})
    .print()
    ,
    newDropDown("consent", "<h3>您同意參與實驗請選「同意」</h3>")
    .add("我同意參與實驗","我不同意參與實驗")
    ,
    newCanvas("empty canvas", 100, 20)
    .print()
    ,
    newButton("start", "<big><b>Start</b></big>")
        .size(200, 50)
        .center()
        .cssContainer("vertical-align", "middle")
        .print()
        .wait(getDropDown("consent")
                .test.selected("我同意參與實驗")
                .failure(newText("","<h3>您得選「同意」才可以開始做實驗。</h3>")
                        .print()
                        .center()
                        .bold()
                        .color("red")
                        .css({"border":"outset 4px black"})))
,
newVar("age")
.settings.global()
.set(getTextInput("age"))
,
newVar("gender")
.settings.global()
.set(getTextInput("gender"))
,
newVar("job")
.settings.global()
.set(getTextInput("job"))
,
newVar("lang")
.settings.global()
.set(getTextInput("lang"))
,
newVar("birthplace")
.settings.global()
.set(getTextInput("birthplace"))
,
newVar("otherlg")
.settings.global()
.set(getTextInput("otherlg"))
,
newVar("consent")
.settings.global()
.set(getDropDown("consent"))
)
.log("age",getVar("age"))
.log("gender",getVar("gender"))
.log("job",getVar("job"))
.log("l1",getVar("lang"))
.log("birthplace",getVar("birthplace"))
.log("otherlg",getVar("otherlg"))
.log("consent",getVar("consent"))
;


//// The experiment itself ////
Template("myTable.csv",row=>
newTrial("experiment",
    newText("Context", row.Context)
        .settings.center()
        .css({"font-size": "20px", "line-height": "2em"})
        .print()
    ,
    newText("Target", row.Target)
        .settings.center()
        .css({"font-size": "20px", "line-height": "2em"})
        .print()
    ,
    newCanvas("empty canvas", 100, 20)
        .print()
    ,
    newScale("judgment", "1","2","3","4","5","6","7") // 7-point scale
        .settings.center()
        .settings.keys()
        .settings.labelsPosition("bottom")
        .css({"font-size": "20px", "line-height": "2em"})
        .settings.before(newText("不通順", "不通順")
                                .css({"font-size": "20px", "line-height": "2em"})
                                .settings.cssContainer({"margin-right": "30px"}))
        .settings.after(newText("通順", "通順")
                                .css({"font-size": "20px", "line-height": "2em"})
                                .settings.cssContainer({"margin-left": "30px"}))
        .log()
        .print()
        .wait()
)
.log("Context",row.Context)
.log("Target",row.Target)
.log("Condition",row.Condition)
.log("age",getVar("age"))
.log("gender",getVar("gender"))
.log("job",getVar("job"))
.log("l1",getVar("lang"))
.log("birthplace",getVar("birthplace"))
.log("otherlg",getVar("otherlg"))
.log("consent",getVar("consent"))
)
;
SendResults("send");
    
//// Last screen (after the experiment is done) ////
newTrial("bye"
    ,
    newText("Thank you for your participation!")
        .print()
    ,
    newButton()
        .wait()                                                 // Wait for a click on a non-displayed button = wait here forever
)
.setOption("countsForProgressBar", false );
// Make sure the progress bar is full upon reaching this last (non-)trial