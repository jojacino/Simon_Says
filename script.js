
/**** JavaScript Simon Says | Author : Joseph M. Davidson | Copyright @ 2016, all rights reserved. ****/

// Simon Says :: game module
var Simon = (function() {
	
	// Class : game object for Simon Says
	var Game = function() {
		
		// the maximum number of levels
		this.max_count = 20;
		this.pattern = []; // the pattern of game levels
		
		// leveling up properties
		this.level = 1; // the current level number
		this.current_index = 0; // progression in a game level
		this.correct = 0; // the number of correct attempts made
		
		this.status = 'new'; // the current game status
		this.strict = false; // whether or not strict mode is turned on
	};
	Game.prototype.clear_pattern = function() {
		
		// reset pattern to an empty array
		this.pattern = [];
		
	}; // resets the game pattern
	Game.prototype.new_pattern = function() {
		
		// inner pattern variable
		var p = [];
			
		// iterate up to max count
		for( var x = 0; x < this.max_count; x++ )
		{
			// create a random index from 0 - 4, 1 for each button
			var index = Math.floor( Math.random() * 4 );
			
			// check that Math returned valid number
			if( index != undefined ) { p.push( index ); } // push index to pattern
			else { break; }
		}
		
		// set this.pattern
		this.pattern = p;
		
		// return the game object for Controller Constructor
		return p;
		
	}; // generates a pattern of Game.max_count in length
	Game.prototype.update_mode = function() {
		
		// tournery to swap strict mode value on game object
		this.strict = this.strict ? false : true;
		
	}; // swaps strict mode on game object
	Game.prototype.start_game = function() {
		
		if( this.status === 'new' )
		{
			// reset game status
			this.status = 'running';
			
		}
		
	}; // starts the current game
	Game.prototype.reset_game = function() {
		
		if( this.status === 'running' )
		{
			// the maximum number of levels
			this.max_count = 20;
			this.pattern = []; // the pattern of game levels

			// leveling up properties
			this.level = 1; // the current level number
			this.current_index = 0; // progression in a game level
			this.correct = 0; // the number of correct attempts made

			this.status = 'new'; // the current game status
			this.strict = false; // whether or not strict mode is turned on
		}
		
	}; // resets the game object
	
	// Class : audio player
	var Audio = function() {
		
		// object cipher
		var audio = this;
		
		// audio player and file record
		this.player = {
			
			// creates sound file @this.file and plays a sound based on a name
			play : function( name ) {
				
				// checks for which URL to use
				if( name !== 'ding' && name !== 'buzz' && name !== 'intro' && name !== 'win' && name !== 'levelup' )
				{
					// loades the file from the simon url
					audio.file = audio.load_sound( audio.simon_url + audio.sounds[ name ] );
				}
				else
				{	// loads the file from the local URL
					audio.file = audio.load_sound( audio.local_url + audio.sounds[ name ] );
				}
			},
			
			// Stops current this.file : sound from playing
			stop : function() {
				
				// pauses current sound file
				audio.file.pause();
				
				// destroys and replaces current sound file
				delete audio.file;
				audio.file = {};
			},
			
		}; // sound player
		this.sounds = { // file names for game sounds
			blue : 'simonSound1.mp3',
			green : 'simonSound2.mp3',
			gold : 'simonSound3.mp3',
			red : 'simonSound4.mp3',
			buzz : 'buzz.mp3',
			ding : 'ding.mp3',
			win : 'win.mp3',
			levelup : 'levelup.mp3',
			intro : 'intro.mp3',
		}; // sound library
		
		// URLs for Simon game sounds
		this.local_url = 'http://alientechnologic.com/Images/simon/sounds/';
		this.simon_url = 'https://s3.amazonaws.com/freecodecamp/';
		
		// the current sound file object
		this.file = {};
		
	};
	Audio.prototype.load_sound = function( file_name ) {
		
		// create sound track audio element
		var track = document.createElement( 'audio' );
		
		// obejct source for sound file
		var track_src = document.createElement( 'source' );
		
		// set source of object sound source file
		track_src.src = file_name;
		
		// set preload
		track.preload = 'auto';
		
		// append source file to track
		track.appendChild( track_src );
		track.volume = 1; // set volume to full
		track.load();// load track source
		track.play();// play file
		
		// set this.file to track file
		this.file = track;
		return track; // return complete sound file
	}; // loads a sound file into a sound/source element
	Audio.prototype.reset_audio = function() {
		
		// object cipher
		var audio = this;
		
		// kill the current audio file
		audio.player.stop();
		
		// audio player and file record
		this.player = {
			
			// creates sound file @this.file and plays a sound based on a name
			play : function( name ) {
				
				// checks for which URL to use
				if( name !== 'ding' && name !== 'buzz' && name !== 'intro' && name !== 'win' && name !== 'levelup' )
				{
					// loades the file from the simon url
					audio.file = audio.load_sound( audio.simon_url + audio.sounds[ name ] );
				}
				else
				{	// loads the file from the local URL
					audio.file = audio.load_sound( audio.local_url + audio.sounds[ name ] );
				}
			},
			
			// Stops current this.file : sound from playing
			stop : function() {
				
				// pauses current sound file
				audio.file.pause();
				
				// destroys and replaces current sound file
				delete audio.file;
				audio.file = {};
			},
			
		}; // sound player
		this.sounds = { // file names for game sounds
			blue : 'simonSound1.mp3',
			green : 'simonSound2.mp3',
			gold : 'simonSound3.mp3',
			red : 'simonSound4.mp3',
			buzz : 'buzz.mp3',
			ding : 'ding.mp3',
			win : 'win.mp3',
			levelup : 'levelup.mp3',
			intro : 'intro.mp3',
		}; // sound library
		
		// URLs for Simon game sounds
		this.local_url = 'http://alientechnologic.com/Images/simon/sounds/';
		this.simon_url = 'https://s3.amazonaws.com/freecodecamp/';
		
		// the current sound file object
		this.file = {};
		
	}; // resets the audio object
	
	// Class : User Interface
	var UI = function() {
		
		// button and display objects
		this.console_buttons = document.getElementsByClassName( 'console-button' );
		this.console_text = document.getElementsByClassName( 'console-text' );
		this.game_buttons = document.getElementsByClassName( 'game-button' );
		
		// lock value for the console 
		this.locked = false;
		
	};
	UI.prototype.notify = function( msg, timing_sec, reset_msg ) {
		
		// root object cipher
		var ui = this;
		
		// set console notification innerHTML
		this.console_text[0].innerHTML = msg;
		
		// set to second message after waiting @timing_sec
		setTimeout( function() { ui.console_text[0].innerHTML = reset_msg; }, 1000 * timing_sec );
		
	}; // post message to console notification and then again after @timing_sec
	UI.prototype.step_count = function( count ) {
		
		// set step_count.innerhtml
		document.querySelector( '.step-count' ).innerHTML =  count || '0';
		
	}; // sets element value to count
	UI.prototype.button_color = function( index ) {
		
		// return color for index
		switch( index ) {
				
			case 0:	return 'blue';	break;
			case 1:	return 'green';	break;
			case 2:	return 'gold';	break;
			case 3: return 'red';	break;
		}
	}; // returns game button color for button index
	UI.prototype.button_index = function( button_element ) {
		
		switch( button_element.classList ) {
				
			case this.game_buttons[0].classList: return 0; break;
			case this.game_buttons[1].classList: return 1; break;
			case this.game_buttons[2].classList: return 2; break;
			case this.game_buttons[3].classList: return 3; break;
		}
		
		// return false if not found
		return false;
		
	}; // returns button color from button
	UI.prototype.game_button = function( color ) {
		
		// return button element for color
		switch( color ) {
				
			case 'blue':	return this.game_buttons[0];	break;
			case 'green':	return this.game_buttons[1];	break;
			case 'gold':	return this.game_buttons[2];	break;
			case 'red':		return this.game_buttons[3];	break;
		}
	}; // returns game button element for color
	UI.prototype.glow = function( color ) {
		
		// get button element
		var button = this.game_button( color );
		
		// set dark color value for element
		var dark = color === 'gold' ? 'goldenrod' : 'dark' + color;
		
		// initialize element background color to dark
		button.style.backgroundColor = dark;
		
		// time out to set color to light and reset ( blink once );
		setTimeout( function() { button.style.backgroundColor = color; }, 200 );
		setTimeout( function() { button.style.backgroundColor = dark; }, 800 );
	}; // glows button to light color for 1 second
	UI.prototype.blink = function( color, length_sec ) {
		
		// disallow excess recursion
		if( length_sec )
		{
			// object cipher
			var ui = this;
		
			// get button
			var button = this.game_button( color );
			
			// figure dark color for button
			var dark = color === 'gold' ? 'goldenrod' : 'dark' + color;
			
			// reset button to dark
			button.style.backgroundColor = dark;
			
			// half second timer on button color to light
			setTimeout( function() { button.style.backgroundColor = color; }, 500 );
			setTimeout( function() {
				
				// if length is still going make a recursive call after set
				if( length_sec > 1 )
				{
					// set bg color to light color
					button.style.backgroundColor = color;
					
					// recursive call reducing length
					ui.blink( color, length_sec - 1 );
				}
				else // if blinking loop is over
				{
					// set color to dark
					button.style.backgroundColor = dark;
				}
				
			}, 1000 );// recursive call - 1 second
		}
	}; // blinks a light once a second for @length_sec seconds
	UI.prototype.button_listener = function( ui, controller, pattern, button ) {
		
		var attempted_color = ui.button_color( ui.button_index( button ) ); // get the buttons color
		var solution_color = ui.button_color( controller.game.pattern[ controller.game.current_index ] ); // convert solution to color
		
		// compare the players attempted color to attempted button color
		if( solution_color === attempted_color ) // CORRECT BUTTON!!!
		{
			// play button sound and flash button glow
			controller.play( attempted_color );
			ui.glow( attempted_color );
			
			// increment game number correct
			controller.game.correct++;
			controller.game.current_index++; // update game attempts as an attempt is being made
			
			if( controller.game.correct >= controller.game.level )// LEVEL UP!!!
			{
				// show level up on console notification
				ui.notify( 'Level Up!', 2, 'Go!' );
				
				/*** Level Up Sound!!! ***/
				controller.play( 'levelup' );
				
				// increment game level
				controller.game.level++;
				
				// set console step count to represent game level
				ui.step_count( controller.game.level );
				
				// start index over at next level
				controller.game.current_index = 0;
				controller.game.correct = 0; // reset amount correct for next level
				
				// disable console and wait for Level Up message to display
				controller.disable_console( 1 ).then( function() {
					
					// Player has beaten the maximum level
					if( controller.game.level > controller.game.max_count ) // GAME OVER!!!
					{
						// player has won the game with this successful attempt
						ui.notify( 'You Win!!!', 3, 'Game Over.' );

						/*** WIN!!! ***/
						controller.play( 'win' );

						// reset step count
						ui.console_text[1].innerHTML = '!';

					}
					else // GAME NOT OVER!!!
					{
						//start sequence at next level
						controller.play_game();

					}
				});
				return true;
			}
			else // NEXT STAGE!!!
			{
				// notify console with next stage message
				ui.notify( 'Correct!', 1, 'Go!' );
				
				// disable console and wait for message and next stage registration
				controller.disable_console( 1 ).then( function() {
					
					return true;
				});
			}
		}
		else // colors are not a match
		{
			ui.notify( 'Incorrect!', 2, 'Again!' );
			
			/*** Play BUZZ Sound!!! ***/
			controller.play( 'buzz' );
			
			// play button sound and flash button glow
			ui.glow( attempted_color );
			
			// redo this last attempt
			controller.game.current_index = 0;
			
			// redo this last attempt
			controller.game.correct = 0;
			
			// access the strict button
			var strict = document.querySelector( '.strict-button' );
			// implement STRICT MODE
			if( strict.style.backgroundColor === 'rgb(221, 221, 221)' )
			{
				controller.game.level = 1;
				ui.step_count( 0 );
			}
			
			controller.disable_console( 2 ).then( function( data ) {
				
				// start again
				controller.play_game();

			});
			
			// validate player move
			return true;
		}
		
	}; // button listener function for gameplay logic
	UI.prototype.listen = function( controller ) {
		
		// root object cipher
		var ui = this;
		
		// create function for listener arguments
		function listener( index ) {
			
			// see if console has been disabled
			if( !controller.console_disabled )
			{
				// cut a level sized piece out of the current game pattern
				var puzzle = controller.game.pattern.slice( 0, controller.game.level )

				// set event listeners and methods for current puzzel
				ui.button_listener( ui, controller, puzzle, ui.game_buttons[ index ] );
			}
		};
		
		// add event listener with local function
		ui.game_buttons[ 0 ].addEventListener( 'mouseup', function() { listener(0); });
		ui.game_buttons[ 1 ].addEventListener( 'mouseup', function() { listener(1); });
		ui.game_buttons[ 2 ].addEventListener( 'mouseup', function() { listener(2); });
		ui.game_buttons[ 3 ].addEventListener( 'mouseup', function() { listener(3); });
		
	}; // listens for user input and returns level of matches achieved
	UI.prototype.start_ui = function( bool_gameover ) {
		
		if( !this.locked )
		{
			// notify player game has begun
			this.notify( 'Begin!', 3, 'Go!' );
			
			// set initial count to 1
			this.console_text[ 1 ].innerHTML = 1;

			// blink all four lights for intro
			this.blink( 'blue', 3 );
			this.blink( 'green', 3 );
			this.blink( 'gold', 3 );
			this.blink( 'red', 3 );

			// lock the console
			this.locked = true;
		}
		
	}; // starts the new game UI
	UI.prototype.reset_ui = function() {
		
		if( this.locked )
		{
			// notify the player game has been resst
			this.notify( 'Game Reset.', 2, 'Welcome!' );
			
			// set opening count to 0
			this.console_text[ 1 ].innerHTML = 0;

			// blink all four lights for reset notification
			this.blink( 'blue', 1 );
			this.blink( 'green', 1 );
			this.blink( 'gold', 1 );
			this.blink( 'red', 1 );

			// unlock the console
			this.locked = false;
		}
		
	}; // resets the game UI
	
	// Class : module controller
	var Controller = function() {
		
		// current game object
		this.game = new Game();
		this.game.new_pattern(); // generate pattern for new game
		
		// current game audio
		this.audio = new Audio();
		
		// current game UI
		this.ui = new UI();
		
		// variable for freezing interaction with the game for a number of seconds
		this.console_disabled = false;
		
	};
	Controller.prototype.disable_console = function( timing_sec ) {
		
		// disable only if enabled
		if( !this.console_disabled ) // if the console is not disabled
		{
			// object cipher
			var controller = this;

			// disable the console
			this.console_disabled = true;
			
			// return promise for timout
			return new Promise( function( resolve ) {
				
				// set time out to enable the console
				setTimeout( function() {

					// enable the console
					controller.console_disabled = false;
					
					// resolve promise
					resolve( controller );
					
				}, timing_sec * 1000 );
				
			});
		}
		
	}; // disable interaction with the game console for a number of seconds
	Controller.prototype.stop = function() {
		
		// stop the audio player object
		this.audio.player.stop();
		
	}; // stops current sound from playing
	Controller.prototype.play = function( sound ) {
		
		// play a sound with the audio player
		this.audio.player.play( sound );
		
	}; // plays a sound
	Controller.prototype.new_game = function() {
		
		// create new game object and set to local property
		this.game = new Game();
		
		// create new audio object and set to local property
		this.audio = new Audio();
		
		// create new pattern for game
		this.game.new_pattern();
		
	}; // creates new game for local object
	Controller.prototype.action_promise = function( action, return_time_sec ) {
		
		// object cipher
		var controller = this;
		
		// return promise object
		return new Promise( function( resolve ) {
			
			// promise to execute after timeout
			setTimeout( function() {
				
				// execute level x sound object
				controller.play( action );
				
				// gather used variables
				var conclusion = { action : action, timing : return_time_sec };
				
				// return object literal containing used variables
				resolve( conclusion );
				return conclusion;
				
				// execute using timing in seconds
			}, return_time_sec * 1000 );
		});
	}; // returns : { action : action, timing : return_time_sec }
	Controller.prototype.play_level = function( color, index ) {
		
		// fire and return promise for level action
		return this.action_promise( color, index + 1 );
		
	}; // plays sound and glows button for level
	Controller.prototype.play_sequence = function( cap ) {
		
		// object cipher
		var controller = this;
		
		// iterate over game pattern
		this.game.pattern.forEach( function( action, index ) {
			
			// limit index of cap
			if( index < cap )
			{
				// get color from index
				var color = controller.ui.button_color( action );
				
				// play action for each game level
				controller.play_level( color, index ).then( function( data ) {
					
					// make colored button glow
					controller.ui.glow( color );
				});
			}
		});
		
	}; // plays a sequence of levels based on Game.pattern
	Controller.prototype.play_game = function() {
		
		// root object cipher
		var controller = this;
		
		// start the game up
		this.game.start_game();
		
		// start sequence at current level
		this.play_sequence( this.game.level );
		
		// disable the game console for ( level + 1 ) in seconds
		this.disable_console( this.game.level + 1.25 ).then( function( data ) {
			
			// listen for player response input using controller
			controller.ui.listen( controller );
		});
		
	}; // plays sequence and listens for response
	Controller.prototype.start_game = function() {
		
		// check that game is new, NOT running or gameover
		if( this.game.status === 'new' )
		{
			// object cipher
			var controller = this;

			// start the ui
			this.ui.start_ui();
			
			// start the game
			this.game.start_game();
			
			// play intro song
			this.audio.player.play( 'intro' );
			
			// disable the console for the length of game intro song
			this.disable_console( 3 ).then( function( data ) {
				
				// start the game after the intro is finished
				controller.play_game();
			});
			
		}
	}; // starts the current game
	Controller.prototype.reset_game = function() {
		
		if( this.game.status === 'running' )
		{	
			this.ui.reset_ui();
			this.audio.reset_audio();
			this.game.reset_game();
			this.game.new_pattern();
			
			var strict = this.ui.console_buttons[1]; // the strict mode button
			
			strict.active = false;
			
			this.disable_console( 3 );
		}
		
	}; // resets the game object
	Controller.prototype.init = function() {
		/**/
		// object cipher
		var controller = this;
		/**/
		// get console buttons
		var start = this.ui.console_buttons[0]; // the start/reset button
		var strict = this.ui.console_buttons[1]; // the strict mode button
		//
		/**/
		// add event listeners
		start.addEventListener( 'click', function() { // start button event listener

			// check if the game console has been disabled
			if( !controller.console_disabled )
			{
				// check if ui on reset lock or is available
				if( !controller.ui.locked ) { controller.start_game(); }
				else { controller.reset_game(); }
			}
		});/**/
		strict.addEventListener( 'click', function() { // strict button event listener

			// check for game status before allowing button press
			if( controller.game.status === 'new' )
			{
				// use attached variable to activate strict mode with element
				if( strict.active ) { strict.active = false; strict.style.backgroundColor = '#DDD'; }
				else { strict.active = true; strict.style.backgroundColor = '#999'; }

				// update mode on game object
				controller.game.update_mode();
			}
		});/**/
		
	}; // inializes simon says game
	
	// testing ***
	var c = new Controller();
	
	c.init();
	
	// Module Exposure
	return c;
	
})();

