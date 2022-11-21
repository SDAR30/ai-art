INSERT INTO users (name, email, password, pic)
VALUES ('Adam Z', 'adam01@gmail.com', 'ghj678','https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png'),
		('Brian Kindo', 'bjkindo@gmail.com', 'jkl890','https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png'),
		('Casmen Joike', 'casguuh@gmail.com', 'hjk789','https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png');

INSERT INTO images (title, ai, url, instructions, prompt, date, user_id)
VALUES ('Sunflower with sunglasses', 'DALL-E 2','https://cdn.openai.com/labs/images/A%20photograph%20of%20a%20sunflower%20with%20sunglasses%20on%20in%20the%20middle%20of%20the%20flower%20in%20a%20field%20on%20a%20bright%20sunny%20day.webp?v=1','', 'A photograph of a sunflower with sunglasses on in the middle of the flower in a field on a bright sunny day','2022-03-24', 1),
('ice cream sundae', 'Midjourney','https://imgur.com/7cdf3SE.png', 'just enter into prompt', 'ice cream sundae, delicious, glistening, cherries, marshmallows, highly detailed, octane render,','2022-04-14', 1),
('Heavy armored Knight', 'Midjourney','https://imgur.com/fHuO0GX.png', '', 'enraged warrior, monsterlike armor, living armor, character design, full body portrait, organic armor, high detail, intricate detail','2022-04-15', 2),
('haunted orchestra', 'Midjourney','https://imgur.com/m02gBJa.png', 'use multiple variations on most detailed image after prompt', 'an orchestra of characters playing instruments on fire in a chapel + surrounded by ghosts made out of chiseled marble + raining, divine, stained glass, octane render, black and white, vibrant, 12th century, ambient occlusion, dynamic lighting, oil','2022-04-21', 3),
('Blue whale in Ancient Egypt', 'DALL-E 2','https://imgur.com/KIqSnj4.png', 'generate a few variations with the clearest pyramid','A blue whale in ancient Egypt swimming through the pyramids, digital art','2022-05-25', 1)