export default function Resume() {
  return (
    <div style={{ color: '#d0d3e0' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h2
          style={{
            margin: '0 0 4px 0',
            fontSize: '22px',
            fontWeight: 700,
            color: '#e8eaf0',
            letterSpacing: '-0.3px',
          }}
        >
          Manandeep Singh Ghumman
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: '13px',
            color: '#3daee9',
            fontWeight: 500,
          }}
        >
          Software Developer • B.Tech CSE (AI & Data Science)
        </p>
        <p
          style={{
            margin: '4px 0 0',
            fontSize: '12px',
            color: '#6b7080',
          }}
        >
          manan.ghumman19@gmail.com • github.com/manan-ghumman • linkedin.com/in/manan-ghumman
        </p>
      </div>

      <Divider />

      {/* About */}
      <Section title="About">
        <p style={{ fontSize: '13px', lineHeight: 1.7, color: '#8b90a0', margin: 0 }}>
          I am a B.Tech Computer Science and Engineering (AI & Data Science) student 
          at Graphic Era Deemed to be University, currently in my 4th semester.
          I work with C, C++, Python, and Java, and I am currently learning full-stack development 
          with modern technologies. Alongside this, I am exploring Blockchain technology and building 
          projects to strengthen my practical skills.
        </p>
      </Section>

      <Divider />

      {/* Skills */}
      <Section title="Skills">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {[
            'C', 'C++', 'Java', 'Python', 'HTML/CSS', 'JavaScript',
            'React', 'Node.js', 'Git', 'Docker', 'Kubernetes', 'Vercel'
          ].map((skill) => (
            <span
              key={skill}
              style={{
                fontSize: '11.5px',
                fontWeight: 500,
                padding: '4px 10px',
                borderRadius: '5px',
                background: 'rgba(61, 174, 233, 0.1)',
                color: '#3daee9',
                border: '1px solid rgba(61, 174, 233, 0.2)',
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </Section>

      <Divider />

      {/* Projects */}
      <Section title="Projects">
          <ProjectItem
            name="MananOS"
            description="Portfolio desktop environment built with React (this site!)"
          />
        <ProjectItem
          name="QooR"
          description="Minimal QR code generator built with Java and JavaFX"
        />
        <ProjectItem
          name="WellCheck (In development)"
          description="Mental health assessment platform with React, C++, and SQLite"
        />
        <ProjectItem
          name="Snake Game"
          description="Classic Snake Game built in C using the Raylib library"
        />
        <ProjectItem
          name="Sudoku Solver"
          description="A Sudoku solver algorithm implemented in C"
        />
      </Section>

      <Divider />

      {/* Education */}
      <Section title="Education">
        <div style={{ marginBottom: '16px' }}>
          <p style={{ margin: '0 0 2px', fontSize: '14px', fontWeight: 600, color: '#d0d3e0' }}>
            B.Tech Computer Science and Engineering (AI & Data Science)
          </p>
          <p style={{ margin: 0, fontSize: '13px', color: '#6b7080' }}>
            Graphic Era Deemed to be University, Dehradun
          </p>
          <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#8b90a0' }}>
            Currently in 4th Semester • CGPA: 9.0
          </p>
        </div>
        <div>
          <p style={{ margin: '0 0 2px', fontSize: '14px', fontWeight: 600, color: '#d0d3e0' }}>
            Senior Secondary (Class 10+2)
          </p>
          <p style={{ margin: 0, fontSize: '13px', color: '#6b7080' }}>
            Satluj Senior Secondary School, Shahbad Markanda
          </p>
          <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#8b90a0' }}>
            Board: CBSE • Percentage: 86.6%
          </p>
        </div>
      </Section>

      <Divider />

      {/* Certifications */}
      <Section title="Certifications">
          <CertificationItem
            name="The Joy of Computing using Python"
            lines={[
              "Issued by: NPTEL (IIT Madras)",
              "Score: 91% (Elite) • Course Duration: 12 Weeks"
            ]}
            credentialLink="/nptel_certificate.png"
          />
        <CertificationItem
          name="AWS Cloud Quest: Cloud Practitioner – Training Badge"
          lines={[
              "Issued by: Amazon Web Services Training and Certification",
            "Issued: October 2025",
            "Credential ID: 16ddfc1a-bb85-49aa-a449-cf542051b0d7"
          ]}
        />
        <CertificationItem
          name="Python for Data Science and AI"
          lines={[
            "Issued by: Coursera",
            "Issued: July 2025",
            "Credential ID: 4c186244-0d64-46f2-a9d1-6a5680679aa5"
          ]}
        />
        <CertificationItem
          name="Artificial Intelligence Essentials V2"
          lines={[
            "Issued by: Coursera",
            "Issued: July 2025",
            "Credential ID: 52dfc48c-ca24-4fa3-aab6-4a15df0f213f"
          ]}
        />
      </Section>

      <Divider />

      {/* Events & Learning */}
      <Section title="Events & Learning">
        <CertificationItem
          name="AWS JAM Event Participant"
          lines={[
            "Amazon Web Services Training Event",
          ]}
          credentialLink="./aws_jam_event.png"
        />
      </Section>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h3
        style={{
          margin: '0 0 12px 0',
          fontSize: '13px',
          fontWeight: 600,
          color: '#8b90a0',
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function Divider() {
  return (
    <div
      style={{
        height: '1px',
        background: 'rgba(255,255,255,0.06)',
        margin: '0 0 20px 0',
      }}
    />
  );
}

function ProjectItem({ name, description }) {
  return (
    <div style={{ marginBottom: '12px' }}>
      <p style={{ margin: '0 0 2px', fontSize: '14px', fontWeight: 600, color: '#d0d3e0' }}>
        {name}
      </p>
      <p style={{ margin: 0, fontSize: '12.5px', color: '#6b7080', lineHeight: 1.5 }}>
        {description}
      </p>
    </div>
  );
}

function CertificationItem({ name, lines, credentialLink }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <p style={{ margin: '0 0 2px', fontSize: '13.5px', fontWeight: 600, color: '#d0d3e0' }}>
        {name}
      </p>
      {lines.map((line, i) => (
        <p key={i} style={{ margin: '2px 0 0', fontSize: '12px', color: i === 0 ? '#6b7080' : '#8b90a0' }}>
          {line}
        </p>
      ))}
      {credentialLink && (
        <a 
          href={credentialLink} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ 
            display: 'inline-block',
            marginTop: '6px', 
            fontSize: '12px', 
            color: '#3daee9',
            textDecoration: 'none'
          }}
        >
          View Credential ↗
        </a>
      )}
    </div>
  );
}
