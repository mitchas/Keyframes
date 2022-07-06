// Logging,
// Pretty replacement for default logging

export default {

	install(Vue, options){


		Vue.prototype.$ope = function(message) {

			return {
				data: function(message){
					console.log(message);
				},
				table: function(message){
					console.table(message);
				},
				log: function(message){
					console.log(
						"%c%s%c%s",
						"color: #00172E; border: 3px solid #00172E; font-size: 14px; padding: 12px 10px; font-weight:bold;",
						"👀 log: 👀",
						"background-color: #F1F5FA; color: black; padding: 12px 10px; font-weight:bold; text-align:center; margin: 0 5px; border-radius: 6px;",
						message,
					);
				},
				info: function (message) {
					console.info(
						"%c%s%c%s",
						"color: #0B02CE; border: 3px solid #0B02CE; font-size: 14px; padding: 12px 10px; font-weight:bold;",
						"👋 info: 👋",
						"background-color: #E2EDFF; color: #0B02CE; padding: 12px 10px; font-weight:bold; text-align:center; margin: 0 5px; border-radius: 6px;",
						message,
					);
				},
				success: function (message) {
					console.info(
						"%c%s%c%s",
						"color: #00C299; border: 3px solid #00C299; font-size: 14px; padding: 12px 10px; font-weight:bold;",
						"🥳 success: 🎉",
						"background-color: #E9FFF1; color: #00C299; padding: 12px 10px; font-weight:bold; text-align:center; margin: 0 5px; border-radius: 6px;",
						message,
					);
				},
				warn: function (message) {
					console.warn(
						"%c%s%c%s",
						"color: #f0c83e; border: 3px solid #f0c83e; font-size: 14px; padding: 12px 10px; font-weight:bold;",
						"📣 warn: 📣",
						"padding: 12px 10px; color: #f0c83e;",
						message,
					);
				},
				error: function (message) {
					// Error specific with message, code,
					if(message.code){
						console.error(
							"%c%s%c%s%c%s",
							"color: #D93D49; border: 3px solid #D93D49; font-size: 14px; padding: 12px 10px; font-weight:bold;",
							"🚨 error: 🚨",
							"color: #D93D49; border: 3px solid #D93D49; font-size: 12px;  margin: 0 5px; padding: 12px 10px; font-weight:bold;",
							message.code,
							"padding: 12px 10px; color: #D93D49;",
							message.message,
						);
					}else{
						// Regular error log
						console.error(
							"%c%s%c%s",
							"color: #D93D49; border: 3px solid #D93D49; font-size: 14px; padding: 12px 10px; font-weight:bold;",
							"🚨 error: 🚨",
							"padding: 12px 10px; color: #D93D49;",
							message,
						);
					}
					
				}
			};
			
		};
	}
  
 };