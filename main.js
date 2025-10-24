
// ===== LOADER =====
        let progress = 0;
        const loaderInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            
            document.getElementById('loaderProgress').style.width = progress + '%';
            document.getElementById('loaderText').textContent = 
                progress < 100 ? `Cargando... ${Math.floor(progress)}%` : 'Listo!';
            
            if (progress >= 100) {
                clearInterval(loaderInterval);
                setTimeout(() => {
                    document.getElementById('loader').classList.add('hidden');
                }, 500);
            }
        }, 200);
        

        // ===== ANIMATED BACKGROUND =====
        const bgCanvas = document.getElementById('bg-canvas');
        const bgCtx = bgCanvas.getContext('2d');
        bgCanvas.width = window.innerWidth;
        bgCanvas.height = window.innerHeight;

        class Particle {
            constructor() {
                this.x = Math.random() * bgCanvas.width;
                this.y = Math.random() * bgCanvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > bgCanvas.width) this.x = 0;
                if (this.x < 0) this.x = bgCanvas.width;
                if (this.y > bgCanvas.height) this.y = 0;
                if (this.y < 0) this.y = bgCanvas.height;
            }

            draw() {
                bgCtx.fillStyle = 'rgba(0, 255, 136, 0.5)';
                bgCtx.beginPath();
                bgCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                bgCtx.fill();
            }
        }

        const particles = [];
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }

        function animateBackground() {
            bgCtx.fillStyle = 'rgba(5, 5, 16, 0.05)';
            bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Connect nearby particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        bgCtx.strokeStyle = `rgba(0, 255, 136, ${0.2 - distance / 500})`;
                        bgCtx.lineWidth = 1;
                        bgCtx.beginPath();
                        bgCtx.moveTo(particles[i].x, particles[i].y);
                        bgCtx.lineTo(particles[j].x, particles[j].y);
                        bgCtx.stroke();
                    }
                }
            }

            requestAnimationFrame(animateBackground);
        }

        animateBackground();

        window.addEventListener('resize', () => {
            bgCanvas.width = window.innerWidth;
            bgCanvas.height = window.innerHeight;
        });

        
        // ===== STATS COUNTER =====
        const statNumbers = document.querySelectorAll('.stat-number');
        let hasAnimated = false;

        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    statNumbers.forEach(stat => {
                        const target = parseInt(stat.getAttribute('data-target'));
                        let current = 0;
                        const increment = target / 50;
                        
                        const updateCounter = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                stat.textContent = target + '+';
                                clearInterval(updateCounter);
                            } else {
                                stat.textContent = Math.floor(current);
                            }
                        }, 40);
                    });
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(document.querySelector('.stats'));

        // ===== SMOOTH SCROLL =====
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // ===== THEME TOGGLE =====
        function toggleTheme() {
            // Implementar cambio de tema aquí
            alert('Función de cambio de tema - ¡Próximamente!');
        }

        // ===== THREE.JS 3D SKILLS =====
        const skillsData = [
  { 
    name: 'Comunicación Efectiva', 
    level: 95, 
    color: 0x4ade80, 
    description: 'Capacidad para expresar ideas con claridad, escuchar activamente y adaptarse a diferentes públicos y contextos.' 
  },
  { 
    name: 'Trabajo en Equipo', 
    level: 92, 
    color: 0x60a5fa, 
    description: 'Colaboración activa con otros profesionales, fomentando la sinergia y el respeto mutuo dentro del grupo.' 
  },
  { 
    name: 'Adaptabilidad', 
    level: 90, 
    color: 0xf59e0b, 
    description: 'Flexibilidad ante cambios y nuevos desafíos tecnológicos, manteniendo siempre una actitud positiva y proactiva.' 
  },
  { 
    name: 'Pensamiento Crítico', 
    level: 88, 
    color: 0xa78bfa, 
    description: 'Capacidad para analizar, evaluar y resolver problemas de manera lógica y estructurada.' 
  },
  { 
    name: 'Liderazgo', 
    level: 85, 
    color: 0xf43f5e, 
    description: 'Facilidad para guiar equipos, tomar decisiones y motivar a otros hacia el cumplimiento de objetivos comunes.' 
  },
  { 
    name: 'Gestión del Tiempo', 
    level: 87, 
    color: 0x38bdf8, 
    description: 'Organización y priorización eficiente de tareas para cumplir objetivos y plazos establecidos.' 
  },
  { 
    name: 'Resolución de Problemas', 
    level: 90, 
    color: 0x22c55e, 
    description: 'Habilidad para identificar causas, generar soluciones efectivas y aplicar mejoras continuas en proyectos.' 
  },
  { 
    name: 'Empatía', 
    level: 94, 
    color: 0xfbbf24, 
    description: 'Comprensión y respeto por las perspectivas de los demás, fortaleciendo relaciones interpersonales y de equipo.' 
  },
  { 
    name: 'Aprendizaje Continuo', 
    level: 93, 
    color: 0x8b5cf6, 
    description: 'Interés constante en adquirir nuevos conocimientos y mejorar habilidades tanto técnicas como personales.' 
  },
  { 
    name: 'Responsabilidad', 
    level: 96, 
    color: 0x0ea5e9, 
    description: 'Compromiso con la calidad del trabajo, la puntualidad y el cumplimiento de los objetivos asignados.' 
  }
];


        const scene3D = new THREE.Scene();
        scene3D.fog = new THREE.Fog(0x050510, 15, 60);

        const camera3D = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera3D.position.z = 25;

        const canvas3D = document.getElementById('skills-canvas');
        const renderer3D = new THREE.WebGLRenderer({ canvas: canvas3D, antialias: true, alpha: false });
        renderer3D.setSize(window.innerWidth, window.innerHeight);
        renderer3D.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer3D.setClearColor(0x050510);

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene3D.add(ambientLight);

        const light1 = new THREE.PointLight(0x00ff88, 2, 100);
        light1.position.set(20, 20, 20);
        scene3D.add(light1);

        const light2 = new THREE.PointLight(0x0088ff, 2, 100);
        light2.position.set(-20, -20, -20);
        scene3D.add(light2);

        const light3 = new THREE.PointLight(0xff0088, 1.5, 100);
        light3.position.set(0, 30, 0);
        scene3D.add(light3);

        // Orbital rings
        const ringGeometry = new THREE.TorusGeometry(12, 0.1, 16, 100);
        const ringMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x00ff88, 
            transparent: true, 
            opacity: 0.2 
        });
        const ring1 = new THREE.Mesh(ringGeometry, ringMaterial);
        ring1.rotation.x = Math.PI / 2;
        scene3D.add(ring1);

        const ring2 = ring1.clone();
        ring2.rotation.y = Math.PI / 3;
        scene3D.add(ring2);

        const ring3 = ring1.clone();
        ring3.rotation.y = -Math.PI / 3;
        scene3D.add(ring3);

        // Background particles
        const particlesGeo = new THREE.BufferGeometry();
        const particlesCount = 2000;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 100;
        }

        particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMat = new THREE.PointsMaterial({
            size: 0.1,
            color: 0x00ff88,
            transparent: true,
            opacity: 0.6,
            sizeAttenuation: true
        });

        const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
        scene3D.add(particlesMesh);

        // Create skill objects
        const skillMeshes = [];
        const shapes = ['box', 'sphere', 'cone', 'torus', 'octahedron', 
                       'tetrahedron', 'dodecahedron', 'icosahedron', 'torus', 'box'];

        skillsData.forEach((skill, index) => {
            let geometry;
            const shape = shapes[index % shapes.length];

            switch(shape) {
                case 'box': 
                    geometry = new THREE.BoxGeometry(2.2, 2.2, 2.2); 
                    break;
                case 'sphere': 
                    geometry = new THREE.SphereGeometry(1.3, 32, 32); 
                    break;
                case 'cone': 
                    geometry = new THREE.ConeGeometry(1.2, 2.5, 32); 
                    break;
                case 'torus': 
                    geometry = new THREE.TorusGeometry(1, 0.4, 16, 100); 
                    break;
                case 'octahedron': 
                    geometry = new THREE.OctahedronGeometry(1.4); 
                    break;
                case 'tetrahedron': 
                    geometry = new THREE.TetrahedronGeometry(1.6); 
                    break;
                case 'dodecahedron': 
                    geometry = new THREE.DodecahedronGeometry(1.3); 
                    break;
                case 'icosahedron': 
                    geometry = new THREE.IcosahedronGeometry(1.4); 
                    break;
            }

            const material = new THREE.MeshStandardMaterial({
                color: skill.color,
                metalness: 0.8,
                roughness: 0.2,
                emissive: skill.color,
                emissiveIntensity: 0.4,
                wireframe: false
            });

            const mesh = new THREE.Mesh(geometry, material);

            // Position in orbital pattern
            const angle = (index / skillsData.length) * Math.PI * 2;
            const tier = Math.floor(index / 5);
            const radius = 12 + (tier * 4);

            mesh.position.x = Math.cos(angle) * radius;
            mesh.position.y = Math.sin(angle) * radius;
            mesh.position.z = (tier - 1) * 6;

            mesh.userData = skill;
            mesh.rotation.x = Math.random() * Math.PI;
            mesh.rotation.y = Math.random() * Math.PI;

            scene3D.add(mesh);
            skillMeshes.push(mesh);
        });

        // Interaction
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        let isDragging = false;
        let previousMouse = { x: 0, y: 0 };
        let isInSkillsSection = false;

        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isInSkillsSection = entry.isIntersecting;
            });
        }, { threshold: 0.3 });

        skillsObserver.observe(document.getElementById('skills-3d'));

        canvas3D.addEventListener('mousedown', (e) => {
            if (!isInSkillsSection) return;
            isDragging = true;
            previousMouse = { x: e.clientX, y: e.clientY };
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
        });

        canvas3D.addEventListener('mousemove', (e) => {
            if (!isInSkillsSection) return;

            if (isDragging) {
                const deltaX = e.clientX - previousMouse.x;
                const deltaY = e.clientY - previousMouse.y;

                scene3D.rotation.y += deltaX * 0.005;
                scene3D.rotation.x += deltaY * 0.005;

                previousMouse = { x: e.clientX, y: e.clientY };
            }

            const rect = canvas3D.getBoundingClientRect();
            mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(mouse, camera3D);
            const intersects = raycaster.intersectObjects(skillMeshes);

            skillMeshes.forEach(mesh => {
                mesh.material.emissiveIntensity = 0.4;
                mesh.scale.set(1, 1, 1);
            });

            if (intersects.length > 0) {
                const obj = intersects[0].object;
                obj.material.emissiveIntensity = 0.8;
                obj.scale.set(1.2, 1.2, 1.2);
                canvas3D.style.cursor = 'pointer';
            } else {
                canvas3D.style.cursor = isDragging ? 'grabbing' : 'grab';
            }
        });

        canvas3D.addEventListener('click', (e) => {
            if (!isInSkillsSection || isDragging) return;

            const rect = canvas3D.getBoundingClientRect();
            mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(mouse, camera3D);
            const intersects = raycaster.intersectObjects(skillMeshes);

            if (intersects.length > 0) {
                const skill = intersects[0].object.userData;
                showSkillPanel(skill);
            }
        });

        canvas3D.addEventListener('wheel', (e) => {
            if (!isInSkillsSection) return;
            e.preventDefault();
            camera3D.position.z += e.deltaY * 0.02;
            camera3D.position.z = Math.max(15, Math.min(40, camera3D.position.z));
        }, { passive: false });

        function showSkillPanel(skill) {
            const panel = document.getElementById('skillPanel');
            document.getElementById('skillName').textContent = skill.name;
            document.getElementById('skillPercentage').textContent = skill.level + '%';
            document.getElementById('skillDescription').textContent = skill.description;
            
            const fill = document.getElementById('skillLevelFill');
            fill.style.width = '0%';
            
            setTimeout(() => {
                fill.style.width = skill.level + '%';
            }, 100);

            panel.classList.add('visible');
        }

        function closeSkillPanel() {
            document.getElementById('skillPanel').classList.remove('visible');
        }

        // Animation loop
        function animate3D() {
            requestAnimationFrame(animate3D);

            skillMeshes.forEach((mesh, index) => {
                mesh.rotation.x += 0.003;
                mesh.rotation.y += 0.003;
                mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.003;
            });

            ring1.rotation.z += 0.001;
            ring2.rotation.z -= 0.0015;
            ring3.rotation.z += 0.002;

            particlesMesh.rotation.y += 0.0005;

            light1.position.x = Math.sin(Date.now() * 0.001) * 20;
            light1.position.z = Math.cos(Date.now() * 0.001) * 20;
            
            light2.position.x = Math.cos(Date.now() * 0.0015) * 20;
            light2.position.z = Math.sin(Date.now() * 0.0015) * 20;

            renderer3D.render(scene3D, camera3D);
        }

        animate3D();

        // Handle resize
        window.addEventListener('resize', () => {
            camera3D.aspect = window.innerWidth / window.innerHeight;
            camera3D.updateProjectionMatrix();
            renderer3D.setSize(window.innerWidth, window.innerHeight);
        });

        // ===== PROJECT CARDS PARALLAX =====
        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `translateY(-15px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
            });
        });

        // ===== NAVIGATION ACTIVE STATE =====
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');

        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === `#${current}`) {
                    link.style.color = 'var(--primary)';
                }
            });
        });

        // ===== SCROLL REVEAL ANIMATION =====
        const revealElements = document.querySelectorAll('.project-card, .stat-card, .tech-badge');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease-out';
            revealObserver.observe(el);
        });

        // ===== EASTER EGG =====
        let konamiCode = [];
        const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.key);
            konamiCode = konamiCode.slice(-10);

            if (konamiCode.join(',') === konamiSequence.join(',')) {
                activateEasterEgg();
            }
        });

        function activateEasterEgg() {
            // Cambiar todos los colores a arcoiris
            document.documentElement.style.setProperty('--primary', '#ff00ff');
            document.documentElement.style.setProperty('--secondary', '#00ffff');
            document.documentElement.style.setProperty('--accent', '#ffff00');
            
            // Hacer que todo rote
            document.body.style.animation = 'rotate 20s linear infinite';
            
            // Agregar animación de rotación si no existe
            if (!document.getElementById('easter-egg-style')) {
                const style = document.createElement('style');
                style.id = 'easter-egg-style';
                style.textContent = `
                    @keyframes rotate {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                `;
                document.head.appendChild(style);
            }
            
            // Mostrar mensaje
            const message = document.createElement('div');
            message.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.9);
                padding: 3rem;
                border-radius: 20px;
                border: 3px solid #ff00ff;
                box-shadow: 0 0 50px rgba(255, 0, 255, 0.8);
                z-index: 10000;
                text-align: center;
                font-family: 'Orbitron', monospace;
                font-size: 2rem;
                color: #ff00ff;
            `;
            message.innerHTML = '🎉 ¡EASTER EGG ACTIVADO! 🎉<br><small style="font-size: 1rem; color: #00ffff;">Recarga la página para volver a la normalidad</small>';
            document.body.appendChild(message);
            
            setTimeout(() => {
                message.remove();
            }, 3000);
        }

        // ===== CURSOR CUSTOM (OPCIONAL) =====
        const cursor = document.createElement('div');
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid var(--primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.1s ease;
            mix-blend-mode: difference;
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });

        // Agrandar cursor en hover de elementos interactivos
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .social-link');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
                cursor.style.marginLeft = '-10px';
                cursor.style.marginTop = '-10px';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                cursor.style.marginLeft = '0';
                cursor.style.marginTop = '0';
            });
        });

        // ===== PERFORMANCE OPTIMIZATION =====
        // Pausar animaciones cuando no están visibles
        let isVisible = true;

        document.addEventListener('visibilitychange', () => {
            isVisible = !document.hidden;
            
            if (!isVisible) {
                // Pausar animaciones pesadas
                renderer3D.setAnimationLoop(null);
            } else {
                // Reanudar animaciones
                animate3D();
            }
        });

        // ===== CONSOLE MESSAGE =====
        console.log('%c¡Hola Developer! 👋', 'font-size: 20px; color: #00ff88; font-weight: bold;');
        console.log('%c¿Revisando el código? Me gusta tu estilo 😎', 'font-size: 14px; color: #0088ff;');
        console.log('%cEste portafolio fue construido con:', 'font-size: 12px; color: #888;');
        console.log('%c- HTML5, CSS3, JavaScript', 'font-size: 11px; color: #666;');
        console.log('%c- Three.js para gráficos 3D', 'font-size: 11px; color: #666;');
        console.log('%c- Mucho café ☕ y dedicación 💪', 'font-size: 11px; color: #666;');
        console.log('%c\nPista: Prueba el código Konami 🎮', 'font-size: 10px; color: #ff0088; font-style: italic;');

        // ===== PRELOAD OPTIMIZATION =====
        // Lazy load para imágenes cuando las agregues
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            observer.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }

        // ===== MOBILE MENU (Para dispositivos móviles) =====
        const createMobileMenu = () => {
            if (window.innerWidth <= 768) {
                const nav = document.querySelector('nav .container');
                const ul = nav.querySelector('ul');
                
                if (!document.querySelector('.mobile-menu-btn')) {
                    const menuBtn = document.createElement('button');
                    menuBtn.className = 'mobile-menu-btn';
                    menuBtn.innerHTML = '☰';
                    menuBtn.style.cssText = `
                        background: none;
                        border: 2px solid var(--primary);
                        color: var(--primary);
                        font-size: 1.5rem;
                        padding: 0.5rem 1rem;
                        cursor: pointer;
                        border-radius: 8px;
                        display: none;
                    `;
                    
                    if (window.innerWidth <= 768) {
                        menuBtn.style.display = 'block';
                        ul.style.display = 'none';
                    }
                    
                    menuBtn.addEventListener('click', () => {
                        if (ul.style.display === 'none') {
                            ul.style.display = 'flex';
                            ul.style.flexDirection = 'column';
                            ul.style.position = 'absolute';
                            ul.style.top = '100%';
                            ul.style.left = '0';
                            ul.style.right = '0';
                            ul.style.background = 'var(--bg-card)';
                            ul.style.padding = '2rem';
                            ul.style.gap = '1.5rem';
                            menuBtn.innerHTML = '✕';
                        } else {
                            ul.style.display = 'none';
                            menuBtn.innerHTML = '☰';
                        }
                    });
                    
                    nav.appendChild(menuBtn);
                }
            }
        };

        createMobileMenu();
        window.addEventListener('resize', createMobileMenu);

        // ===== TYPING EFFECT PARA HERO =====
        const heroTitle = document.querySelector('.hero-title');
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let charIndex = 0;
        function typeEffect() {
            if (charIndex < originalText.length) {
                heroTitle.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeEffect, 100);
            }
        }
        
        setTimeout(typeEffect, 2000);

        // ===== FINAL TOUCHES =====
        // Agregar efecto de parallax al scroll
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero-content');
            
            parallaxElements.forEach(el => {
                const speed = 0.5;
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

        console.log('%c✨ Portfolio cargado exitosamente!', 'font-size: 16px; color: #00ff88; font-weight: bold;');
        // 🔧 Ajustar el canvas 3D al tamaño de la pantalla
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight * 0.6; // altura proporcional

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});
