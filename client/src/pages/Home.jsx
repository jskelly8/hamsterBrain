// React imports
import Hero from '../components/Hero.jsx'
import PomodoroTimer from '../components/PomTimer.jsx'

// Home Page
export default function Home() {
  return (
    <main>
      <div className="hero">
        <Hero />
        <div className="btn divCenter">
          <a href="/how-it-works"><button>How It Works</button></a>
        </div>
      </div>
      <div className='card'>
        <div className='cardImg'>
          <img></img>
        </div>
        <h4 className="divCenter">Customize your schedule</h4>
        <p className="divCenter">Get started planning your life!</p>
        <div className="btn">
          <a href="/planner"><button>Planner</button></a>
        </div>
      </div>
      <div className='card'>
        <div className='cardImg'>
          <img></img>
        </div>
        <h4 className="divCenter">Track your tasks with motivation</h4>
        <p className="divCenter">Create task lists and set up rewards!</p>
        <div className="btn">
          <a href="/tasks"><button>Tasks</button></a>
        </div>
      </div><div className='card'>
        <div className='cardImg'>
          <img></img>
        </div>
        <h4 className="divCenter">Join the community</h4>
        <p className="divCenter">Meet others and get your friends to help!</p>
        <div className="btn ">
          <a href="/community"><button>Social</button></a>
        </div>
      </div>
      <div className='quoteContainer'>
        {/* Add random quote generated from API later */}
      </div>
      <div className='timerContainer divCenter'>
        <PomodoroTimer />
      </div>
      <div className='testimonialContainer'>
        <h3 className="divCenter">Testimonials</h3>
        {/* testimonials generator from seed data?*/}
      </div>
      <div className='aboutContainer'>
        <h3 className="divCenter">About Us</h3>
        <p className="divCenter">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>
    </main>
  )
}