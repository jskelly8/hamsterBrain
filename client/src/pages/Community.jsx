// React imports (if needed)

// Page
export default function Community() {
  return (
    <div className="communityContainer">
      <h1>Welcome to the community!</h1>
      <p className="commP">This is a place for all users to share, connect, and grow together. Here, you can find motivation, support, and advice as you work towards your personal and professional goals.</p>
      <div className="featuresSection">
        <h2>Features</h2>
        <h5>(**Comming soon**)</h5>
        <div className="commItems">
          <div className="commCard">
            <p>Community Forums: Dive into discussions, ask questions, and share your knowledge.</p>
          </div>
          <div className="commCard">
            <p>Direct Messaging: Connect with fellow members one-on-one.</p>
          </div>
          <div className="commCard">
            <p>Groups: Join groups that match your interests and goals.</p>
          </div>
          <div className="commCard">
            <p>Events: Stay informed about upcoming community events and meetups.</p>
          </div>
        </div>
      </div>
      <div className="testimonialSection">
        <h2>User Testimonials</h2>
        {/* Iterate through testimonial seeds here when able */}
        <div className="commCard">
          <p>"This community has been a game-changer for me. I've found not just guidance but also genuine friends who are as passionate as I am."</p>
          <cite>- Alex</cite>
        </div>
      </div>
    </div>
  )
}
