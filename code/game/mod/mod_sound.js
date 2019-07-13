
mod_sound = {};

/**播放音效
 * @param name
 * @param loop
 * @returns {*|Number|null}
 */
mod_sound.playeffect = function(name,loop){
    // cc.log("soundName=" + name);
    return cc.audioEngine.playEffect(name,loop);
}

/**
 * 停止音效
 * @param audio
 * @returns {*}
 */
mod_sound.stopffect = function(audio){
    return cc.audioEngine.stopEffect(audio);
}

/**
 * 播放音乐
 * @param name
 * @param loop
 * @returns {*}
 */
mod_sound.playbmg = function(name,loop){
    return cc.audioEngine.playMusic(name,loop);
}

/**
 * 停止音乐
 * @param release
 * @returns {*}
 */
mod_sound.stopbmg = function(release){
    return cc.audioEngine.stopMusic(release);
}

/**
 * 停止所有声音
 */
mod_sound.stopallsound = function(){
    cc.audioEngine.stopAllEffects();
    cc.audioEngine.stopMusic(true);
}

/**
 * 停止所有音效
 */
mod_sound.stopAllEffects = function(){
    cc.audioEngine.stopAllEffects();
}

/**
 * 设置音效大小
 * @param _0to1
 */
mod_sound.setEffectsVolume = function(_0to1){
    cc.log(_0to1);
    cc.audioEngine.setEffectsVolume(_0to1);
}

mod_sound.getEffectsVolume = function(){
   return cc.audioEngine.getEffectsVolume();
}

/**
 * 设置音乐大小
 * @param _0to1
 */
mod_sound.setMusicVolume = function(_0to1){
    cc.log(_0to1);
    cc.audioEngine.setMusicVolume(_0to1)
};

mod_sound.getMusicVolume = function(){
    return cc.audioEngine.getMusicVolume();
}

