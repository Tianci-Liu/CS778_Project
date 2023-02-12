# coding:utf-8
from flask import Flask
from flask import jsonify
from flask import request
import json

from fairseq.models.roberta import RobertaModel
import torch.nn.functional as F
import re

app = Flask(__name__)

@app.route("/Project3",methods=["POST"])
def getResult():


    req = request.get_json()

    ## Sample input includes context and question
    sample_context = req["factsRule"]
    sample_question = req["judgeStatement"]
    
    ## Load model
    checkpoint_path = 'checkpoints_depth_0_1_2_3_ext_pararule_plus_all/'
    checkpoint_file = 'checkpoint_best.pt'
    data_name_or_path = 'depth-0-1-2-3-ext-pararule-plus-all-table-bin'
    roberta = RobertaModel.from_pretrained(
        checkpoint_path,
        checkpoint_file=checkpoint_file,
        data_name_or_path=data_name_or_path
    )
    
    # roberta.cuda()
    roberta.eval()
    

    
    ## Data processing for the raw input from user
    context = sample_context.replace("\n", " ")
    context = re.sub(r'\s+', ' ', context)
    text = sample_question
    text = re.sub(r'\s+', ' ', text)
    context_text = context + text
    
    ## Model prediction and output
    tokens = roberta.encode(context_text)
    prediction = roberta.predict('depth-0-1-2-3-ext-pararule-plus-all-head', tokens).argmax().item()
    false_prediction_probability = F.softmax(roberta.predict('depth-0-1-2-3-ext-pararule-plus-all-head', tokens),dim=1)[0][0].item()
    true_prediction_probability = F.softmax(roberta.predict('depth-0-1-2-3-ext-pararule-plus-all-head', tokens),dim=1)[0][1].item()
    
    print("end")
    
    res = {
            "input":{
                "factsRule" : sample_context,
                "judgeStatement" : sample_question
            },
            "label": prediction,
            "true_probability": true_prediction_probability,
            "false_probability": false_prediction_probability,
        }
        
    return json.dumps(res, ensure_ascii=False)
    
if __name__ == "__main__":
    app.run(host="0.0.0.0",port=8899,debug=True)