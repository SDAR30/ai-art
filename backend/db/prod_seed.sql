INSERT INTO users (username, email, password, pic)
VALUES ('Adam Z', 'adam01@gmail.com', 'ghj678','https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png'),
		('Brian Kindo', 'bjkindo@gmail.com', 'jkl890','https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png'),
		('Casmen Joike', 'casguuh@gmail.com', 'hjk789','https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png'),
		('Dylan Kalzeeni', 'dhizeeni@yahoo.com', 'dfgnji','https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png');

INSERT INTO images (title, ai, url, instructions, prompt, date, user_id)
VALUES ('Sunflower with sunglasses', 'DALL-E','https://imgur.com/eLNEk6N.png','', 'A photograph of a sunflower with sunglasses on in the middle of the flower in a field on a bright sunny day','2022-03-24', 1),
('ice cream sundae', 'Midjourney','https://imgur.com/7cdf3SE.png', 'just enter into prompt', 'ice cream sundae, delicious, glistening, cherries, marshmallows, highly detailed, octane render,','2022-04-14', 1),
('Heavy armored Knight', 'Midjourney','https://imgur.com/fHuO0GX.png', 'just used the prompt', 'enraged warrior, monsterlike armor, living armor, character design, full body portrait, organic armor, high detail, intricate detail','2022-04-15', 2),
('haunted orchestra', 'Midjourney','https://imgur.com/m02gBJa.png', 'use multiple variations on most detailed image after prompt', 'an orchestra of characters playing instruments on fire in a chapel + surrounded by ghosts made out of chiseled marble + raining, divine, stained glass, octane render, black and white, vibrant, 12th century, ambient occlusion, dynamic lighting, oil','2022-04-21', 3),
('Blue whale in Ancient Egypt', 'DALL-E','https://imgur.com/KIqSnj4.png', 'generate a few variations with the clearest pyramid','A blue whale in ancient Egypt swimming through the pyramids, digital art','2022-05-25', 1),
('Cyperpunk Sword','DALL-E','https://imgur.com/oRojHqt.png', 'Go to outpainting at labs.openai.com and use this prompt. Erase some of the ice in bottom half', 'a high resolution colorful cyberpunk sword cutting through ice in the city at night','2022-09-23',3),
('Paper Tiger Quilt', 'Midjourney','https://imgur.com/NZBLXpT.png','Use prompt and make similar variations until desired outcome and add upscale','tiger tesla silicon valley weed twitter 8k paper quilling', '2022-10-10',2),
('Business Man','DALL-E', 'https://imgur.com/Xv9Ldpo.png', 'after a few generations with this prompt on dall-e','A business man thinking business thoughts, futurism','2022-7-14',3),
('Indoor lounge pool area','DALL-E','https://imgur.com/UZBsF97.png','What i did was enter this prompt and then generate variations one time to get this','a sunlit indoor lounge area with a pool with clear water and another pool with translucent pastel pink water, next to a big window, digital art','2022-3-10',4),
('Magical bowl of soup', 'DALL-E', 'https://imgur.com/sHFmn5D.png','After the prompt, i selected the most colorful image and made a variation of it and used outplaining to remove the defects','a bowl of soup that is also a portal to another dimension, digital art','2022-4-11',4),
('Submarine For Fish','DALL-E','https://imgur.com/hEEOuCl.png', 'I selected the third variation and edited it a bit','3D render of a cute submarine in an aquarium on a dark blue background, digital art','2022-6-13',4);