'use client'
import React, { useState } from "react";
import { Container } from 'react-bootstrap';
import Header, { useActiveState } from "@/components/admin-view/Header";
import AdminHomeView from "@/components/admin-view/home";
import AdminAboutView from "@/components/admin-view/about";
import AdminProjectsView from "@/components/admin-view/projects";
import AdminContactView from "@/components/admin-view/contact";

const initialHomeFormData = {
  heading : '',
  summary : ''
}

const initialAboutFormData = {
  heading : '',
  summary : ''
}

const initialProjectsFormData = {
  heading : '',
  summary : ''
}

const initialContactFormData = {
  heading : '',
  summary : ''
}

export default function AdminView(){
    const { active, handleSelect } = useActiveState();
    const [homeViewFormData, setHomeViewFormData] = useState(initialHomeFormData)
    const [aboutViewFormData, setAboutViewFormData] = useState(initialAboutFormData)
    const [projectsViewFormData, setProjectsViewFormData] = useState(initialProjectsFormData)
    const [contactViewFormData, setContactViewFormData] = useState(initialContactFormData)

    return (
        <div>
        <Header active={active} handleSelect={handleSelect} />
          <Container>
            {active === "home" && <AdminHomeView formData={homeViewFormData} setFormData={setHomeViewFormData}/>}
            {active === "about" && <AdminAboutView formData={aboutViewFormData} setFormData={setAboutViewFormData}/>}
            {active === "projects" && <AdminProjectsView formData={projectsViewFormData} setFormData={setProjectsViewFormData}/>}
            {active === "contact" && <AdminContactView formData={contactViewFormData} setFormData={setContactViewFormData}/>}
          </Container>
      </div>
    );
}