import { ComponentFixture, TestBed } from "@angular/core/testing";

import { Projects } from "./projects";

describe("Projects", () => {
  let component: Projects;
  let fixture: ComponentFixture<Projects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Projects],
    }).compileComponents();

    fixture = TestBed.createComponent(Projects);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("shows a details modal with the selected project's visit link", async () => {
    fixture.detectChanges();

    const projectCard = fixture.nativeElement.querySelector(
      '.project-card'
    ) as HTMLButtonElement;
    projectCard.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const dialog = fixture.nativeElement.querySelector('[role="dialog"]') as HTMLElement;
    const projectLink = dialog.querySelector('.project-link') as HTMLAnchorElement;

    expect(dialog.textContent).toContain('AgroSmart Tech');
    expect(projectLink.href).toBe('https://agro-8w1r.onrender.com/');
    expect(dialog.textContent).toContain('Tecnologías');
    expect(dialog.textContent).toContain('Hosting');

    (dialog.querySelector('.modal-close') as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeNull();
  });

  it('switches to another project from the modal carousel', async () => {
    fixture.detectChanges();
    (fixture.nativeElement.querySelector('.project-card') as HTMLButtonElement).click();
    fixture.detectChanges();
    await fixture.whenStable();

    const otherProject = fixture.nativeElement.querySelector(
      '.modal-project-card'
    ) as HTMLButtonElement;
    otherProject.click();
    fixture.detectChanges();

    const dialog = fixture.nativeElement.querySelector('[role="dialog"]') as HTMLElement;
    expect(dialog.querySelector('#project-modal-title')?.textContent).toContain(
      'Proyecto Certificados'
    );
    expect((dialog.querySelector('.project-link') as HTMLAnchorElement).href).toBe(
      'https://pruebas-80fw.onrender.com/#/'
    );
    expect(dialog.querySelectorAll('.modal-project-card')).toHaveLength(1);
  });

  it("opens details for the second project and closes them with Escape", async () => {
    fixture.detectChanges();

    const projectCards = fixture.nativeElement.querySelectorAll(
      '.project-card'
    ) as NodeListOf<HTMLButtonElement>;
    projectCards[1].click();
    fixture.detectChanges();
    await fixture.whenStable();

    const dialog = fixture.nativeElement.querySelector('[role="dialog"]') as HTMLElement;
    expect(dialog.textContent).toContain('Proyecto Certificados');
    expect((dialog.querySelector('.project-link') as HTMLAnchorElement).href).toBe(
      'https://pruebas-80fw.onrender.com/#/'
    );

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeNull();
  });
});
