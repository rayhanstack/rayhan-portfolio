<template>
  <div id="app">
    <CursorGlow />
    <Navbar />
    <main id="main-content">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ServicesSection />
      <ExperienceSection />
      <EducationSection />
      <TestimonialsSection />
      <ContactSection />
      <ChatBot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import CursorGlow from '@/components/CursorGlow.vue'
import HeroSection from '@/sections/HeroSection.vue'
import AboutSection from '@/sections/AboutSection.vue'
import SkillsSection from '@/sections/SkillsSection.vue'
import ProjectsSection from '@/sections/ProjectsSection.vue'
import ServicesSection from '@/sections/ServicesSection.vue'
import ExperienceSection from '@/sections/ExperienceSection.vue'
import EducationSection from '@/sections/EducationSection.vue'
import TestimonialsSection from '@/sections/TestimonialsSection.vue'
import ContactSection from '@/sections/ContactSection.vue'
import ChatBot from '@/components/ChatBot.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { useTheme } from '@/composables/useTheme'

useTheme()
useScrollReveal()
</script>
