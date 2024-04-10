import { Link } from 'react-router-dom';

function HowItWorks() {
  return (
  // Component implementation
  <div className="how-it-works">
    <div className="how-it-works-container">
    <div className="how-intro how-box">
    
    <h2>Welcome to Hamster Brain!</h2>
    <p> Hamster Brain is an ADHD-focused task management application. Our app is designed to provide support and assistance to individuals with ADHD, helping them stay organized, focused, and productive.</p>


    </div>
    <div className="how-buddy how-box">
    <h4>Task Management and Buddy System </h4><p>One of the core features of our app is the ability to create and manage tasks effectively. Users can create task lists, set deadlines, and prioritize their activities. What sets us apart is our unique buddy system, where users can pair up with a trusted buddy who can help monitor their task list and provide support. Buddies can check off completed tasks, offering encouragement and accountability along the way.</p>


    </div>
    <div className="how-pomodoro how-box">
    <h4>Pomodoro Timer</h4><p>To aid in concentration and time management, we&apos;ve integrated a Pomodoro timer into our app. The Pomodoro Technique is a popular time management method that involves breaking work into intervals, typically 25 minutes in length, separated by short breaks. This technique helps users maintain focus and avoid burnout, making it an invaluable tool for individuals with ADHD.</p>
    </div>
    <div className="how-community how-box">
    <h4>Community Support</h4><p>We understand the importance of community and peer support in managing ADHD. Our app features a dedicated community page where users can connect with others facing similar challenges, share tips, advice, and experiences, and offer mutual support and encouragement. Building a supportive community is key to overcoming obstacles and achieving success.</p>
    </div>
    <div className="how-calendar how-box">
    <h4>Calendar Integration</h4><p>Organization is key to managing ADHD symptoms, which is why our app includes a built-in calendar feature. Users can schedule tasks, appointments, and events, helping them stay on top of their commitments and manage their time effectively. The calendar provides a visual representation of their schedule, making it easier to plan and prioritize tasks.</p>
    </div>
    <div className="how-closing how-box">
    <h4>Whether you&apos;re looking for task management tools, peer support, or time management techniques, our app has everything you need to thrive with ADHD. Join our community today and take control of your life with confidence!</h4>
    </div>
    <div className="how-hamsterlogo">
      <Link to="/">
                    <img className="hamsterlogo" src='/hamsterbrain_dark.png' alt='Logo' />
                </Link>
                </div>
    </div>
    </div>
  );
}
export default HowItWorks;