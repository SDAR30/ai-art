import React from 'react';
import { NavLink } from 'react-router-dom';
import './About.scss';

function About(props) {
    return (
        <div className='about'>
            <h1>About</h1>
            <p>This website aims to share and explore the innovative and evolving field of artificial intelligence-generated artwork. It provides a platform for visitors to discover new examples of AI-generated images, learn about the methods used to create them, and engage with a community of like-minded individuals. By showcasing these images and providing insight into their creation, the website seeks to inspire and educate visitors about the potential of AI-generated art.</p>

            
            <div className='about__portrait'>
                <img src='https://imgur.com/aJYw0E7.png' alt='portrait'></img>
                <div>
                <h2>Developer</h2>
                <p>I’m Shoaib Dar, a detail-oriented and analytical Full Stack Developer who loves to solve problems and puzzles. I have a Bachelor's degree in Computer Science with a strong focus on artificial intelligence, machine learning and computer graphics. Through this website, I aim to provide a platform for other enthusiasts to explore and appreciate this emerging new art form. </p>
                <span className='about__contact'><NavLink to="/contact">Contact Shoaib Dar</NavLink></span>
                
                </div>
            </div>

            <h2>What is AI ART and how does it work?</h2>
            <p>AI art, also known as generative art or computational art, is a form of art that is created using algorithms and machine learning techniques. The process typically involves training a machine learning model on a large dataset of existing art, and then using that model to generate new artwork. AI art is a relatively new field, and there is still much to be discovered about the different techniques and approaches that can be used to create it. However, it is already producing some remarkable and thought-provoking works, and is likely to continue to be an important area of artistic and technological innovation in the years to come.</p>

            <p>There are several different approaches to creating AI art, but one common method is to use a neural network, a type of machine learning model that is loosely based on the structure of the human brain. A neural network can be trained on a large dataset of images, and then used to generate new images that are similar in style and content to the original dataset.   Another approach is to use a genetic algorithm, which is a type of optimization technique that mimics the process of natural selection. In this approach, a population of candidate artworks is created, and then evaluated based on their similarity to a target image or set of images. The best-performing artworks are then combined and mutated to create a new generation of candidates, and the process is repeated until a satisfactory result is achieved. AI art offers an exciting new frontier in art creation, and it is expected to be an increasingly important field for future artistic and technological innovations.</p>

            <h2>What images are used to train the AI?</h2>
            <p>The images used to train AI artwork are chosen based on the type of art being created and the specific techniques being used. To create landscape paintings, for example, the training dataset would likely include images of landscapes. Often, publicly available datasets like ImageNet, which has millions of labeled images of objects, animals, and scenes, are used for training. The size and quality of the training dataset are crucial for high-quality AI-generated artwork. A diverse and high-quality dataset helps the AI learn to recognize and reproduce a wide range of visual styles and characteristics, while consistent labeling and metadata for the images can improve the accuracy of the AI's output. The selection of training images is critical for ensuring that the AI can learn and produce compelling new artwork that accurately represents the desired style and content.</p>

            <h2>Popular AI Art Generators and Their Differences</h2>
            <p>There are many different AI art generators available online, and each one uses a different approach to creating its artwork. Some of the most popular AI art generators include:</p>
            <ul>
                <li><a href='https://openai.com/dall-e-2/'>DALL-E</a>: developed by OpenAI, is a general-purpose image generation model that can create a wide range of images based on textual input. It is known for its ability to create highly creative and imaginative images that go beyond what is possible or commonly seen in traditional photography or other visual media.</li>
                <li><a href="https://www.midjourney.com/">Midjourney</a>: an AI model that generates images of people and faces based on textual input. It is trained on a dataset of thousands of portraits and can create highly detailed and realistic images of faces based on textual prompts.</li>
                <li><a href="https://stablediffusionweb.com/">Stable Diffusion</a>: a type of generative model that uses diffusion processes to create high-quality images with realistic details and textures. This approach is known for its ability to create photorealistic images that are visually similar to traditional photography. Stable Diffusion is particularly well-suited for generating images of natural scenes, such as landscapes and seascapes.</li>
                <li><a href="https://deepai.org/">DeepAI</a>: an online tool that uses artificial neural networks to generate a range of different types of images, including art, graphics, and animations. It features several different tools, including style transfer, image colorization, and image-to-image translation, that can be used to create unique and visually striking images.</li>
                <li><a href="https://deepdreamgenerator.com/">DeepDream</a>: Developed by Google, DeepDream is a neural network that can transform photographs and other images into abstract and dreamlike images. DeepDream is known for its ability to generate images with intricate details and patterns that resemble those found in nature.</li>
                <li><a href="https://www.artbreeder.com/">ArtBreeder</a>: a web-based application that allows users to combine and evolve different AI-generated images to create new and unique works of art. The application features a range of different styles and techniques, and is popular among both artists and enthusiasts.</li>


            </ul>
        </div>
    );
}

export default About;