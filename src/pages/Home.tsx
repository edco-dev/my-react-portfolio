import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Home.module.css'; // Import the CSS module
import 'animate.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'; // Import icons
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

interface HomeProps {
    isDarkMode: boolean;  // Define the isDarkMode prop type
}

const Home: React.FC<HomeProps> = ({ isDarkMode }) => {
  const [darkMode, setDarkMode] = useState<boolean>(isDarkMode);

  // Toggle dark/light mode
  // const toggleMode = () => {
  //   setDarkMode((prevMode) => !prevMode);
  // };

  // Use useEffect to apply dark/light mode class to the body element
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
    }
  }, [darkMode]);
    
  const [isProjectsExpanded, setIsProjectsExpanded] = useState(true);
  const [isSkillsExpanded, setIsSkillsExpanded] = useState(true);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false); // State for About Me section
  const [projects, setProjects] = useState<any[]>([]); // Dynamic data for projects
  const [skills, setSkills] = useState<any[]>([]); // Dynamic data for skills

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false); // State for the Contact Modal

  const [modalType, setModalType] = useState<'add' | 'edit' | null>(null); // Determines if modal is for add or edit
  const [currentEditId, setCurrentEditId] = useState<string | null>(null); // ID of the item being edited

  const [formData, setFormData] = useState({ name: '', description: '' }); // Shared form data for projects and skills
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' }); // Contact form data

  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({}); // State for tracking expanded items
  // const [contentHeights, setContentHeights] = useState<{ [key: string]: number }>({});
  const [isDisabled, setIsDisabled] = useState(true);

  
const toggleItem = (id: string) => {
  setExpandedItems((prev) => ({
    ...prev,
    [id]: !prev[id], // Toggle the state for the given ID
  }));
  }; 
  
  const toggleProjects = () => setIsProjectsExpanded(!isProjectsExpanded);
  const toggleSkills = () => setIsSkillsExpanded(!isSkillsExpanded);
  const toggleDescription = () => setIsDescriptionExpanded(!isDescriptionExpanded); // Toggle for About Me section
  
  useEffect(() => {
    // Trigger page load animation on body with slideInUp effect
    document.body.classList.add('animate__animated', 'animate__slideInUp');
    
    // Remove animation class after animation ends (optional)
    const timeout = setTimeout(() => {
        document.body.classList.remove('animate__animated', 'animate__slideInUp');
    }, 2000); // 1000ms is the duration of the slideInUp animation
    
    return () => clearTimeout(timeout); // Clean up on component unmount
}, []);
  
  // Fetch Projects and Skills on Mount
  useEffect(() => {
    fetchProjects();
    fetchSkills();
  }, []);
  useEffect(() => {

      setIsDisabled(true);

      
    
  }, []);
  const fetchProjects = async () => {
    try {
      const response = await axios.get('https://react-portfolio-backend-e6vg.onrender.com/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchSkills = async () => {
    try {
      const response = await axios.get('https://react-portfolio-backend-e6vg.onrender.com/skills');
      setSkills(response.data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  const openModal = (type: 'project' | 'skill', action: 'add' | 'edit', item: any = null) => {
    setModalType(action);
    if (action === 'edit' && item) {
      setCurrentEditId(item._id);
      setFormData({ name: item.name, description: item.description });
    } else {
      setCurrentEditId(null);
      setFormData({ name: '', description: '' });
    }
    if (type === 'project') setShowProjectModal(true);
    if (type === 'skill') setShowSkillModal(true);
  };

  const handleSaveProject = async () => {
    try {
      if (modalType === 'edit' && currentEditId) {
        // Edit Project
        const response = await axios.put(`http://localhost:5001/projects/${currentEditId}`, formData);
        setProjects(projects.map((project) => (project._id === currentEditId ? response.data : project)));
      } else {
        // Add Project
        const response = await axios.post('http://localhost:5001/projects', formData);
        setProjects([...projects, response.data]);
      }
      setShowProjectModal(false);
      setFormData({ name: '', description: '' });
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleSaveSkill = async () => {
    try {
      if (modalType === 'edit' && currentEditId) {
        // Edit Skill
        const response = await axios.put(`http://localhost:5001/skills/${currentEditId}`, formData);
        setSkills(skills.map((skill) => (skill._id === currentEditId ? response.data : skill)));
      } else {
        // Add Skill
        const response = await axios.post('http://localhost:5001/skills', formData);
        setSkills([...skills, response.data]);
      }
      setShowSkillModal(false);
      setFormData({ name: '', description: '' });
    } catch (error) {
      console.error('Error saving skill:', error);
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5001/projects/${id}`);
      setProjects(projects.filter((project) => project._id !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleDeleteSkill = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5001/skills/${id}`);
      setSkills(skills.filter((skill) => skill._id !== id));
    } catch (error) {
      console.error('Error deleting skill:', error);
    }
  };

  const handleContactSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    try {
      // Send the request and ignore the response
      await axios.post('https://react-portfolio-backend-e6vg.onrender.com/contact', contactForm);
  
      alert('Message sent successfully!');
      setContactForm({ name: '', email: '', message: '' });
      setShowContactModal(false);
    } catch (error) {
      console.error('Error sending message:', error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          alert(`Failed to send message. Error: ${error.response.data.message || 'Server error'}`);
        } else if (error.request) {
          alert('Failed to send message. No response from server.');
        } else {
          alert('Failed to send message. Please try again later.');
        }
      } else {
        alert('Failed to send message. Please try again later.');
      }
    }
  };
  return (
    <div className={`${styles.dashboard} ${isDarkMode ? styles.dark : styles.light}`}>
      {/* Sidebar for Projects */}
      <aside className={styles.sidebar}>
        <div className={styles.latestChanges}>
        <div className={styles.latestProjectsHeader}>
  <h2>Latest Projects</h2>
  <button className={styles.addProjectButton} onClick={() => openModal('project', 'add')} disabled={true}>
    <FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }} />
    New Project
  </button>
</div>

{/* Wrapper for the entire project list to apply show more/show less */}
<div className={`${styles.projectListWrapper} ${isProjectsExpanded ? styles.expanded : ''}`}>
  <ul className={styles.changeList}>
    {(isProjectsExpanded ? projects : projects.slice(0, 3)).map((project) => (
      <li key={project._id} className={styles.changeItem}>
        <div className={styles.bullet}></div>
        <div className={styles.changeText}>
          {/* Project Name with Expand/Collapse Icon */}
          <div className={styles.projectName}>
            {project.name}
            <FontAwesomeIcon
              icon={expandedItems[project._id] ? faChevronUp : faChevronDown} // Toggle icon
              onClick={() => toggleItem(project._id)} // Toggle description visibility
              className={styles.toggleIcon}
            />
          </div>

          {/* Project Description with transition */}
          <div
            id={`description-${project._id}`}
            style={{
              maxHeight: expandedItems[project._id] ? '500px' : '0', // Adjust height for the description
              overflow: 'hidden',
              transition: 'max-height 0.4s ease, opacity 0.4s ease', // Smooth transition
              opacity: expandedItems[project._id] ? 1 : 0, // Fade in/out the description
            }}
          >
            <p className={styles.projectDescription}>{project.description}</p>
          </div>

          {/* Project Actions (Edit and Delete Icons) */}
          <div className={styles.projectActions}>
  <span
    className={`${styles.editIcon} ${isDisabled ? styles.disabled : ''}`}
    onClick={() => !isDisabled && openModal('project', 'edit', project)} // Avoid action when disabled
  >
    <FontAwesomeIcon icon={faEdit} />
  </span>
  <span
    className={`${styles.deleteIcon} ${isDisabled ? styles.disabled : ''}`}
    onClick={() => !isDisabled && handleDeleteProject(project._id)} // Avoid action when disabled
  >
    <FontAwesomeIcon icon={faTrash} />
  </span>
</div>

        </div>
      </li>
    ))}
  </ul>
</div>

{/* Show More/Show Less Button */}
<button className={styles.showMoreButton} onClick={toggleProjects} >
  {isProjectsExpanded ? 'Show Less' : 'Show More'}
</button>
        </div>
      </aside>

      {/* Main Contents s*/}
      <main className={styles.mainContent}>
        
        <h2 className={styles.pageIndicator}>About me</h2>
        
        
        
        <h1 className={styles.title}>
        Gerico&nbsp;Mangali. <br />
        Software&nbsp;Engineer.
        </h1>{/* Contact Me Button (right side of About Me) */}
        <button className={styles.contactButton} onClick={() => setShowContactModal(true)}>
  <FaEnvelope /> Get In Touch
</button>
<p className={styles.description}>
  I am a dedicated <span className={styles.highlight}>Software Engineer</span> with a strong foundation in both 
  <span className={styles.highlight}>frontend</span> and <span className={styles.highlight}>backend</span> development. 
  In my current role as an <span className={styles.highlight}>Associate Software Engineer</span>, I specialize in 
  modernizing legacy systems, optimizing codebases, and enhancing backend performance to ensure scalability and efficiency.
</p>

    <p className={styles.description}>
      My expertise extends to building robust, scalable applications, and I am deeply passionate about creating 
      <span className={styles.highlight}> intuitive user interfaces</span> that deliver exceptional user experiences. 
      I thrive in solving complex technical challenges and am committed to continuous learning and growth within the dynamic tech landscape.
    </p>
    <p className={styles.description}>
      I have hands-on experience in integrating cutting-edge technologies such as <span className={styles.highlight}>AWS services</span>, 
      <span className={styles.highlight}>Firebase Cloud</span>, and various third-party APIs, ensuring seamless system integration 
      and enhanced functionality. My ability to work with modern frameworks like <span className={styles.highlight}>React</span> and 
      <span className={styles.highlight}>TypeScript</span> allows me to build performant and maintainable web applications.
              </p>
              {isDescriptionExpanded && (
  <>
    <p className={styles.description}>
      Beyond technical skills, I excel in <span className={styles.highlight}>collaboration</span>, 
      working effectively within Agile teams to deliver high-quality solutions that align with business goals. 
      I have also developed strong project management skills, successfully leading migration projects and ensuring 
      timely delivery of critical milestones. My approach is rooted in adaptability, problem-solving, and a focus on customer satisfaction.
    </p>
  </>
)}

        <button className={styles.showMoreButton} onClick={toggleDescription}>
          {isDescriptionExpanded ? 'Show Less' : 'Show More'}
        </button>

        <div className={styles.horizontalLine}></div>

        {/* Skills Section */}
        <div className={styles.skillsHeader}>
  <h2 className={styles.sidebarTitle}>Top Skills</h2>
  <button className={styles.addSkillButton} onClick={() => openModal('skill', 'add')} disabled={true}>
    <FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }} />
    New Skill
  </button>
</div>

{/* Wrapper for the entire skills list to apply show more/show less */}
<div className={`${styles.skillListWrapper} ${isSkillsExpanded ? styles.expanded : ''}`}>
  <ul className={styles.changeList}>
    {(isSkillsExpanded ? skills : skills.slice(0, 3)).map((skill) => (
      <li key={skill._id} className={styles.changeItem}>
        <div className={styles.bullet}></div>
        <div className={styles.changeText}>
          <div className={styles.projectName}>
            {skill.name}
            <FontAwesomeIcon
              icon={expandedItems[skill._id] ? faChevronUp : faChevronDown} // Toggle icon
              onClick={() => toggleItem(skill._id)} // Toggle description visibility
              className={styles.toggleIcon}
            />
          </div>

          {/* Skill Description with transition */}
          <div
            id={`description-${skill._id}`}
            style={{
              maxHeight: expandedItems[skill._id] ? '500px' : '0', // Adjust height for the description
              overflow: 'hidden',
              transition: 'max-height 0.4s ease, opacity 0.4s ease', // Smooth transition
              opacity: expandedItems[skill._id] ? 1 : 0, // Fade in/out the description
            }}
          >
            <p className={styles.projectDescription}>{skill.description}</p>
          </div>

          {/* Skill Actions (Edit and Delete Icons) */}
          <div className={styles.projectActions}>
      <span
        className={`${styles.editIcon} ${isDisabled ? styles.disabled : ''}`}
        onClick={() => !isDisabled && openModal('project', 'edit', skill)} // Prevent action if disabled
      >
        <FontAwesomeIcon icon={faEdit} />
      </span>
      <span
        className={`${styles.deleteIcon} ${isDisabled ? styles.disabled : ''}`}
        onClick={() => !isDisabled && handleDeleteSkill(skill._id)} // Prevent action if disabled
      >
        <FontAwesomeIcon icon={faTrash} />
      </span>
    </div>
        </div>
      </li>
    ))}
  </ul>
</div>

{/* Show More/Show Less Button for Skills */}
<button className={styles.showMoreButton} onClick={toggleSkills}>
  {isSkillsExpanded ? 'Show Less' : 'Show More'}
</button>


        
      </main>

      {/* Contact Modal */}
      {showContactModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Thank you for messaging.</h2>
            <form onSubmit={handleContactSubmit} className={styles.contactForm}>
              <input
                type="text"
                placeholder="Your Name"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                required
              />
              <textarea
                placeholder="Your Message"
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                required
              />
                           <button className={styles.messageButton} type="submit">
      <FaPaperPlane style={{ marginRight: '8px' }} /> {/* Add space between the icon and text */}
      Send Message
    </button>
                          <button
              className={styles.modalButtonCancel}
              onClick={() => setShowContactModal(false)}
            >
              Close
            </button>
            </form>
          </div>
        </div>
      )}
<footer className={styles.footer}>
  <div className={styles.footerContent}>
    <p>&copy; {new Date().getFullYear()} Gerico Mangali. All rights reserved.</p>
    <div className={styles.socialLinks}>
      {/* Add any social media links or icons here */}
    
    </div>
  </div>
</footer>
      {/* Project/Skill Modal */}
      {(showProjectModal || showSkillModal) && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>{modalType === 'edit' ? 'Edit' : 'Add'} {showProjectModal ? 'Project' : 'Skill'}</h2>
            <div className={styles.formField}>
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className={styles.formField}>
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className={styles.actions}>
              <button className={styles.modalButton} onClick={showProjectModal ? handleSaveProject : handleSaveSkill} disabled={true}>
                {modalType === 'edit' ? 'Save Changes' : 'Add'}
              </button>
              <button
                className={styles.modalButtonCancel}
                onClick={() => (showProjectModal ? setShowProjectModal(false) : setShowSkillModal(false))}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        
      )}
      
     {/* Footer Section */}
    
    </div>
    
  );
  
};

export default Home;
