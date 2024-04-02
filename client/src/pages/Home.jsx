// React imports
import Hero from '../components/Hero.jsx'
import PomodoroTimer from '../components/PomTimer.jsx'

// Home Page
export default function Home() {
  return (
    <main className='homeContainer'>
      <div className="hero">
        <Hero />
        <div className="btn divCenter">
          <a href="/how-it-works"><button>How It Works</button></a>
        </div>
      </div>

      <div className='cardsContainer'>
        <div className='card'>
          <div className='cardImg'>
            <img></img>
          </div>
          <h4>Customize your schedule</h4>
          <p>Get started planning your life!</p>
          <div className="btn">
            <a href="/planner"><button>Planner</button></a>
          </div>
        </div>

        <div className='card'>
          <div className='cardImg'>
            <img></img>
          </div>
          <h4>Track your tasks with motivation</h4>
          <p>Create task lists and set up rewards!</p>
          <div className="btn">
            <a href="/tasks"><button>Tasks</button></a>
          </div>
        </div>

        <div className='card'>
          <div className='cardImg'>
            <img></img>
          </div>
          <h4>Join the community</h4>
          <p>Meet others and get your friends to help!</p>
          <div className="btn">
            <a href="/community"><button>Social</button></a>
          </div>
        </div>
      </div>

      <div className='quoteContainer'>
        {/* Add random quote generated from API later */}
      </div>

      <div className='bottomSection'>
        <div className='timerContainer'>
          <PomodoroTimer />
        </div>

        <div className='bottomRight'>
          <div className='testimonialContainer'>
            <h3>Testimonials</h3>
            {/* testimonials generator from seed data?*/}
          </div>

          <div className='aboutContainer'>
            <h3>About Us</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>
        </div>
      </div>

    </main>
  )
}