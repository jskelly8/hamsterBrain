// React imports
import { useState, useEffect } from 'react';
import Hero from '../components/Hero.jsx';
import PomodoroTimer from '../components/PomTimer.jsx';
import testimonials from '../data/testimonials';
import quotes from '../data/quotes';
import Auth from '../utils/auth';

// Home Page
export default function Home() {
  // Render 2 random Testimonials from data
  const getRandomTestimonials = () => {
    const shuffled = testimonials.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  };

  const randomTestimonials = getRandomTestimonials();

  // Randomly render a quote from the local data
  const [quote, setQuote] = useState({ text: '', author: '' });

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  // Page Render
  return (
    <main className='homeContainer'>
      <div className="hero">
        <Hero />
        <div className="btn divCenter quicksand">
          <a href="/how-it-works"><button>How It Works</button></a>
        </div>
      </div>

      <div className='cardsContainer'>
        <div className='card'>
          <div className='cardImg'>
            <img></img>
          </div>
          <h4 className="quicksand">Track your tasks with motivation</h4>
          <p className="quicksand">Create task lists and set up rewards!</p>
          <div className="btn">
            <a href="/tasks"><button>Tasks</button></a>
          </div>
        </div>

        <div className='card'>
          <div className='cardImg'>
            <img></img>
          </div>
          <h4 className="quicksand">Customize your schedule</h4>
          <p className="quicksand">Get started planning your life!</p>
          <div className="btn">
            <a href="/planner"><button>Planner</button></a>
          </div>
        </div>

        <div className='card'>
          <div className='cardImg'>
            <img></img>
          </div>
          <h4 className="quicksand">Join the community</h4>
          <p className="quicksand">Meet others and get your friends to help!</p>
          <div className="btn">
            <div className="btn">
              {/* Conditional link based on user authentication status */}
              <a href={Auth.loggedIn() ? "/community" : "/login"}>
                <button>Social</button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className='quoteContainer'>
        <p>{quote.text}</p>
        <cite>{quote.author}</cite>
      </div>

      <div className='bottomSection'>
        <div className='timerContainer'>
          <PomodoroTimer />
        </div>

        <div className='bottomRight'>
          <div className='testimonialContainer'>
            <h3 className="quicksand">Testimonials</h3>
            <div className="testimonial-list">
              {randomTestimonials.map(({ id, name, role, text }) => (
                <div key={id} className="commCard">
                  <blockquote>"{text}"</blockquote>
                  <cite>- {name}, {role}</cite>
                </div>
              ))}
            </div>
          </div>

          <div className='aboutContainer'>
            <h3>About Us</h3>
            <p>Welcome to Hamster Brain, the innovative productivity tool tailored for individuals with ADHD. Developed with care by our skilled team, Hamster Brain is hosted on GitHub and invites collaboration and improvement from users like you. Our core team comprises four dedicated contributors: Jess Skelton, Justin Hodges, Matt Smart, & Joseph Padilla (see our links in the footer). Together, we're committed to enhancing your productivity through Hamster Brain, making it easier for you to manage tasks and maintain focus. Join our community and discover how Hamster Brain can empower you to achieve more each day.</p>
          </div>
        </div>
      </div>

    </main>
  )
}