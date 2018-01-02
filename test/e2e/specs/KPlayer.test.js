module.exports = {
    'start': function(client) {
        client.url('http://localhost:8080/examples/index.html')
            .assert.containsText('#app', '插件集成demo');
    },

    'test KPlayer': function(client) {

        client.pause(1000);
        /**
         *  检测各元素是否存在
         */
        // 播放按钮
        client.expect.element('.control-play-icon').to.be.visible;
        // timeline
        client.expect.element('.control-time').to.be.visible;
        // dashboard
        client.expect.element('.kplayer-dashboard').to.be.visible;
        // 倍速
        client.expect.element('.control-rate').to.be.visible;
        // 音量
        client.expect.element('.ku-player-plugin-volume').to.be.visible;
        // 全屏
        client.expect.element('.control-fullscreen-icon').to.be.visible;

        // 点击开始播放
        client.click('.control-play-icon', () => {
            // 检测播放按钮出现
            // client.expect.element('.control-pause-icon').to.be.visible.before(1500);
            // 检测时间插件更新
            client.expect.element('.progress-input-range').to.have.attribute('data-val').before(3000);
        });

        // // 点击全屏
        // client.click('.control-fullscreen-icon', () => {
        //     // 检测全屏按钮是否有状态更新
        //     client.expect.element('.control-halfscreen-icon').to.be.visible;
        // });
        //
        // client.click('.control-halfscreen-icon');
    },

    'end': function(client) {

        // 结束
        client.end();
    }
};
