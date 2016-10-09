# chatBtn
聊天按钮随着触屏移动

this.chatBtn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.mouseDown,this);
this.chatBtn.removeEventListener(egret.TouchEvent.TOUCH_END,this.mouseUp,this);

        /*
         * 聊天窗口点击事件
         */ 
        private mouseDown(e:egret.TouchEvent):void{
            this._touchStatus = true;
            this.startPos = new egret.Point(this.chatBtn.x, this.chatBtn.y);
            this._distance.x = e.stageX - this.chatBtn.x;
            this._distance.y = e.stageY - this.chatBtn.y;
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.mouseMove,this);
        }
        private mouseUp(e:egret.TouchEvent):void{
            this._touchStatus = false;
            if(this.chatBtn.x <= this.stage.stageWidth/2){
                this.chatBtn.x = 0;
            }else{
                this.chatBtn.x = this.stage.stageWidth - this.chatBtn.width;
            }
            if(Math.abs(this.chatBtn.x - this.startPos.x) <=1 && Math.abs(this.chatBtn.y - this.startPos.y) <= 1){
                //如果移动距离非常小，为点击，跳转到对话界面
                Message.instance.send(MsgCMD.MODULE_SHOW,WindowName.CHAT_MAIN)
            }
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.mouseMove,this);
        }
        private mouseMove(e:egret.TouchEvent):void{
            if(this._touchStatus){
                this.chatBtn.x = e.stageX - this._distance.x;
                this.chatBtn.y = e.stageY - this._distance.y;
                if(this.chatBtn.y <= 200){
                    this.chatBtn.y = 200;
                    if(this.chatBtn.x <= this.stage.stageWidth / 2) {
                        this.chatBtn.x = 0;
                    } else {
                        this.chatBtn.x = this.stage.stageWidth - this.chatBtn.width;
                    }
                }
                if(this.chatBtn.y > this.stage.stageHeight - 200){
                    this.chatBtn.y = this.stage.stageHeight - 200;
                    if(this.chatBtn.x <= this.stage.stageWidth / 2) {
                        this.chatBtn.x = 0;
                    } else {
                        this.chatBtn.x = this.stage.stageWidth - this.chatBtn.width;
                    }
                }
                if(this.chatBtn.x < 0){
                    this.chatBtn.x = 0;
                }
                if(this.chatBtn.x > this.stage.stageWidth - this.chatBtn.width){
                    this.chatBtn.x = this.stage.stageWidth - this.chatBtn.width;
                }
            }
        }
        
        
