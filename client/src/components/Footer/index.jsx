// React imports 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  // Dev Data
  const devs = [
    {
      name: 'Jess',
      gitLink: 'https://github.com/jskelly8',
      linkedInLink: 'https://www.linkedin.com/in/jess-nichole-skelton'
    },
    {
      name: 'Justin',
      gitLink: 'https://github.com/Justinh144',
      linkedInLink: 'https://www.linkedin.com/in/justin-hodges-2462ab2bb/'
    },
    {
      name: 'Matt',
      gitLink: 'https://github.com/GoldenRoad14',
      linkedInLink: 'https://www.linkedin.com/in/matt-smart14'
    },
    {
      name: 'Joseph',
      gitLink: 'https://github.com/warhawk1950',
      linkedInLink: 'https://www.linkedin.com/in/joseph-padilla-0053a8303/'
    }
  ];

  // Site Repo Data
  const siteRepo = {
    name: 'Hamster Brain',
    gitLink: 'https://github.com/jskelly8/hamsterBrain'
  };

  // Footer
  return (
    <footer className='footerContainer'>
      <div className='siteRepo'>
        <p>{siteRepo.name}</p>
        <a href={siteRepo.gitLink} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
      <div className='devs'>
        {devs.map(dev => (
          <div key={dev.name} className='dev'>
            <p>{dev.name}</p>
            <a href={dev.gitLink} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            {dev.linkedInLink && (
              <a href={dev.linkedInLink} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            )}
          </div>
        ))}
      </div>
    </footer>
  );
}