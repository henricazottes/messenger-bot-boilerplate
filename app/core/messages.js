'use strict'

const messages = {
  'menu': {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'generic',
        elements: [{
          title: 'Your awsome bot',
          subtitle: 'Click any button to continue',
          item_url: 'http://me.shyjal.com/',
          image_url: 'http://messengerdemo.parseapp.com/img/rift.png',
          buttons: [{
            type: 'postback',
            title: 'Image',
            payload: 'image',
          }, {
            type: 'postback',
            title: 'Generic',
            payload: 'generic',
          },{
            type: 'postback',
            title: 'Receipt',
            payload: 'receipt',
          }],
        }]
      }
    }
  },

	'default' : {
      text: 'Hit the thumbs up button to show menu.'
  },

	'image' : {
    attachment: {
      type: 'image',
      payload: {
        url: 'http://i.imgur.com/zYIlgBl.png'
      }
    }
  },

  'button' : {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'button',
        text: 'How do I look like ?',
        buttons:[{
          type: 'web_url',
          url: 'http://me.shyjal.com/',
          title: 'See my book'
        }, {
          type: 'postback',
          title: 'Beautiful !',
          payload: 'pretty'
        },
        {
          type: 'postback',
          title: 'Not my type',
          payload: 'ugly'
        }]
      }
    }
  },

  'generic' : {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'generic',
        elements: [{
          title: 'rift',
          subtitle: 'Next-generation virtual reality',
          item_url: 'http://me.shyjal.com/',
          image_url: 'http://messengerdemo.parseapp.com/img/rift.png',
          buttons: [{
            type: 'web_url',
            url: 'http://me.shyjal.com/',
            title: 'Open Web URL'
          }, {
            type: 'postback',
            title: 'Call Postback',
            payload: 'default',
          }],
        }, {
          title: 'touch',
          subtitle: 'Your Hands, Now in VR',
          item_url: 'http://me.shyjal.com/',
          image_url: 'http://messengerdemo.parseapp.com/img/touch.png',
          buttons: [{
            type: 'web_url',
            url: 'http://me.shyjal.com/',
            title: 'Open Web URL'
          }, {
            type: 'postback',
            title: 'Call Postback',
            payload: 'default',
          }]
        }]
      }
    }
  }
}
module.exports = messages
